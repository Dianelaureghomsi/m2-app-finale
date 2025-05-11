"use client";

import { useSendMessages } from "@/src/hooks/useSendMessage";
import { ChatMessage } from "./ChatMessage";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "../Messages";
import { useState } from "react";
import { Input } from "../Input";
import { Input as SCNInput } from "../ui/input";
import { Button } from "../ui/button";
import { File, Type } from "lucide-react";

export type MessageContentType = {
    text : string;
    file?:any;
}

export function ForumChatRoom() {
  const { loading, messages, error, fetchMessages, sendMessage } =
    useSendMessages();

  const { user } = useAuth();

  const [messageContent, setMessageContent] = useState<MessageContentType>({text:"bonjour"});

  const handleChange = (name:string, value:any) => setMessageContent((mc) => ({ ...mc, [name]: value }))

  if (loading) return <p>En attente des derniers messages...</p>;


  return (
    <div className="w-full h-full rounded-md p-6 my-4 space-y-4">
      <div className="bg-gray-50 p-6">
        {!error && messages.length === 0 ? (
          <div>Aucun message pour l'instant...</div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUserSide={user.id === message.senderId}
              senderId={message.senderId}
              filePath={message.filePath}
            />
          ))
        )}
        {error && (
          <div className="space-y-6">
            <MessageCard content={error} type="error" />

            <Button onClick={fetchMessages}>Reessayer</Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Input
          setValue={(e) => handleChange("text",e.target.value)}
          value={messageContent.text}
          placeholder="Faites par de votre avis..."
        />

        <SCNInput
          type="file"
          placeholder="Ajouter"

          className="max-w-46 w-full h-12 mb-3 rounded-full file:hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              console.log("Nom du fichier sélectionné :", file.name);
              handleChange("file",file)
            }
          }}
        />

        <Button
          className="h-12 mb-3 bg-purple-600 w-32"
          onClick={() => sendMessage(messageContent, user.id)}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
}
