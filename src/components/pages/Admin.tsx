"use client";

import { UserManager } from "@/src/components/admin/UserManager";
// import { EventManager } from "@/src/components/admin/EventManager";
import { StatsView } from "@/src/components/admin/StatsView";
import { NotificationSection } from "../notifications/NotificationSection";
import { Banner } from "../Banner";
import { DialogForm } from "../DialogForm";
import { useEffect, useState } from "react";
import { MessageCard } from "../Messages";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Subjects, User } from "@/src/generated/prisma";
import Link from "next/link";
import { Button } from "../Button";

export function AdminPage() {
  const DEFAULT_TIMEOUT = 5000;

  const [parents, setParents] = useState<
    Pick<User, "fullname" | "id" | "email">[]
  >([]);

  const [message, setMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [toName, setToName] = useState<string>("");
  const [formLoading, setFormLoading] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
  fetch("/api/users/parents")
    .then((res) => res.json())
    .then((data) => {
      setParents(data.parents || []);
    })
    .catch((err) => console.error("Erreur de chargement des parents :", err));
  }, []);

  const handleSendEmail = async () => {

    setFormLoading(true);
    
    if (!toName || !message || !email || !emailSubject) {
      setError("Tous les champs sont requis !");
      setTimeout(() => {
        setError("");
        setFormLoading(false);
      }, DEFAULT_TIMEOUT);
      return;
    }

    const formData = new FormData();
    formData.append("name", toName);
    formData.append("email", email);
    formData.append("subject", emailSubject);
    formData.append("message", message);
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch("/api/email", {
      method: "POST",
      body: formData,
    });

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setToName("");
        setMessage("");
        setEmail("");
        setEmailSubject("");
        setFile(null);
        setSuccess(
          "Email a bien été envoyé ! Veuillez notifier le destinataire."
        );
      } else {
        setError("Erreur lors de l'envoi de l'email.");
      }
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setFormLoading(false);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, DEFAULT_TIMEOUT);
    }
  };

  return (
    <div className="py-4 px-40 space-y-8">
      <Banner />

      <h2 className="text-lg font-semibold mb-2">Statistiques</h2>
      <StatsView />

      <div className="my-6">
        <DialogForm
          label="Notifier par mails"
          title="Envoyer un email"
          secondLabel="Nouveau mail"
          buttonLabel="Envoyer"
          onSubmit={handleSendEmail}
          loading={formLoading}
        >
          <form>
            {error && <MessageCard type="error" content={error} />}
            {success && <MessageCard type="success" content={success} />}

            <div className="space-y-3 my-3">
              <Label>Objet du mail</Label>

              <Select value={emailSubject} onValueChange={setEmailSubject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un parent" />
                </SelectTrigger>

                <SelectContent>
                  {Object.values(Subjects).map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 mb-3">
              
              <Label>Nom du parent</Label>

              <Select
                onValueChange={(id) => {
                  const selectedParent = parents.find((p) => p.id === id);
                  if (selectedParent) {
                    setToName(selectedParent.fullname);
                    setEmail(selectedParent.email);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un parent" />
                </SelectTrigger>
                <SelectContent>
                  {parents.map((parent) => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.fullname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 mb-3">
              <Label>Email du destinataire</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                value={email}//email
                //readOnly
                //className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="space-y-3 mb-3">
              <Label>Fichier à envoyer (facultatif)</Label>
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="space-y-3 mb-3">
              <Label>Votre message</Label>
              <textarea
                className="min-h-32 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Le contenu du mail..."
              ></textarea>
            </div>
          </form>
        </DialogForm>
      </div>

      <div className="w-full flex justify-end my-4">
        <Link href="/m2/forum" className="w-52">
          <Button variant="outlined">Continuer vers le forum</Button>
        </Link>
      </div>

      <UserManager />

      <NotificationSection
        label="Mes notifications"
        canCreate
        type="personal"
      />

      <section>
        <h2 className="text-xl font-semibold mb-4">Toutes les notifications</h2>
        <NotificationSection
          label="Toutes les notifications"
          canCreate={false}
        />
      </section>
    </div>
  );
}
