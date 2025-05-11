"use client";

import { useState } from "react";
import { Button } from "@/src/components/Button";

export function RequestForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setStatus("sending");

    const res = await fetch("/api/requests/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      setMessage("");
      setStatus("success");
    } else {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <textarea
        className="w-full border p-3 rounded-md resize-none outline-none focus:border-purple-500"
        rows={4}
        placeholder="Écrire une requête à l'administration..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button onClick={handleSubmit}>
        {status === "sending" ? "Envoi..." : "Envoyer la requête"}
      </Button>

      {status === "success" && (
        <p className="text-green-600 text-sm">Requête envoyée avec succès.</p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm">Erreur lors de l'envoi.</p>
      )}
    </div>
  );
}
