import { useState, useEffect } from "react";
import { Message } from "../generated/prisma";
import { MessageContentType } from "../components/forum/ForumChatRoom";

interface UseMessagesReturn {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: MessageContentType, senderId: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  fetchMessages: () => Promise<void>;
}

export function useSendMessages(): UseMessagesReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer tous les messages
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/messages");

      if (!response.ok) {
        throw new Error("Erreur dans la récupérations des derniers messages");
      }
      const data = await response.json();
      console.log({data})
      setMessages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour envoyer un message
  const sendMessage = async (content: MessageContentType, senderId: string) => {
    setLoading(true);
    setError(null);
    console.log({content})
    try {
      const formData = new FormData();
      formData.append("content", content.text);      // ton texte ou objet JSON.stringify(content)
      formData.append("senderId", senderId);    // l'ID de l'utilisateur
      content.file && formData.append("file", content.file);    // le fichier (File | Blob)

      console.log({content,senderId,formDataContent:formData.get("content")})

      const response = await fetch("/api/messages", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoie du message");
      }
      const newMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (err: any) {
      console.log({SendMesageError:err});
      setError(err.message);
    } finally {
      fetchMessages();
      setLoading(false);
    }
  };
  
  // Fonction pour supprimer un message
  const deleteMessage = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {messages
        throw new Error("Echec de suppression du message");
      }
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id)
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      fetchMessages();
      setLoading(false);
    }
  };

  // Charger les messages au montage du composant
  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    deleteMessage,
    fetchMessages,
  };
}
