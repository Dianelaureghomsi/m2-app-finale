"use client";

import { useUser } from "@/src/hooks/useUser";
import { Download } from "lucide-react";
import Link from "next/link";

type ChatMessageProps = {
  isUserSide: boolean;
  content: string;
  senderId: string;
  filePath?: string; // <-- Ajout du fichier
};

export function ChatMessage({
  isUserSide = false,
  content,
  senderId,
  filePath,
}: ChatMessageProps) {
  const { user: sender } = useUser(senderId);

  const isImage = filePath?.match(/\.(jpeg|jpg|png|gif)$/i);
  const isPDF = filePath?.endsWith(".pdf");

  return (
    <div
      className={`my-3 space-y-2 flex flex-col ${
        isUserSide ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`p-4 max-w-md rounded-md ${
          isUserSide ? "bg-purple-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {/* Texte du message */}
        <p className="mb-2 whitespace-pre-wrap">{content}</p>

        {/* Fichier joint s'il y en a un */}
        {filePath && (
          <div className="mt-2 border-t pt-2">
            {isImage && (
              <img
                src={filePath}
                alt="Image envoyée"
                className="max-w-xs rounded-md mb-2 cover max-h-[256px]"
              />
            )}

            {isPDF && (
              <iframe
                src={filePath}
                title="PDF"
                className="w-full h-48 rounded-md mb-2 max-h-[256px]"
              />
            )}

            {/* Lien de téléchargement */}
            <Link
              href={filePath}
              download
              target="_blank"
              className="inline-flex items-center text-sm text-white hover:underline"
            >
              <Download className="w-4 h-4 mr-1" />
              
            </Link>
          </div>
        )}
      </div>

      {/* Nom de l’expéditeur */}
      <span className="text-gray-400 text-sm">{sender?.fullname}</span>
    </div>
  );
}
