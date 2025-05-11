"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/Button";
import { Input } from "../Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Plus } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  message: string;
  subject: string;
  creatorId: string;
  receiverId: string;
  createdAt: string;
};

export function EventManager() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("EVENEMENT");
  const [creatorId, setCreatorId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setNotifications(data.events || []));
  }, [refresh]);

  const handleSubmit = async () => {
    if (!title || !message || !subject || !creatorId || !receiverId) {
      alert("Tous les champs sont requis !");
      return;
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message, subject, creatorId, receiverId }),
    });

    if (res.ok) {
      setTitle("");
      setMessage("");
      setSubject("EVENEMENT");
      setCreatorId("");
      setReceiverId("");
      setRefresh(!refresh);
    } else {
      alert("Erreur lors de la création de la notification.");
    }
  };

  return (
    <div className="space-y-6">
      <Dialog>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <DialogTrigger asChild>
            <div className="w-40">
              <Button variant="outlined" onClick={() => {}}>
                <Plus className="mr-4 size-5" />
                Créer
              </Button>
            </div>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[512px]">
          <DialogHeader>
            <DialogTitle>Créer une notification</DialogTitle>
            <DialogDescription>
              Remplissez les champs pour créer une nouvelle notification.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-2">
            <Input
              label="Titre"
              placeholder="Titre de la notification"
              value={title}
              setValue={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border p-2 w-full rounded"
              placeholder="Message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <select
              className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="RESULTAT">Résultat</option>
              <option value="ABSENCE">Absence</option>
              <option value="COMPORTEMENT">Comportement</option>
              <option value="EVENEMENT">Événement</option>
              <option value="EXCLUSION">Exclusion</option>
            </select>
            <Input
              label="ID du créateur"
              placeholder="ID de l'utilisateur créateur"
              value={creatorId}
              setValue={(e) => setCreatorId(e.target.value)}
            />
            <Input
              label="ID du destinataire"
              placeholder="ID de l'utilisateur destinataire"
              value={receiverId}
              setValue={(e) => setReceiverId(e.target.value)}
            />
          </form>
          <DialogFooter className="mt-4">
            <Button type="button" onClick={handleSubmit}>
              Créer la notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        <h3 className="font-semibold text-lg">Notifications enregistrées</h3>
        <ul className="list-disc pl-5 mt-2 text-sm">
          {notifications.map((n) => (
            <li key={n.id}>
              <strong>{n.title}</strong> – {new Date(n.createdAt).toLocaleDateString()}
              <br />
              <span className="text-gray-600">{n.message}</span>
              <br />
              <span className="text-gray-500">
                Sujet : {n.subject}, Créateur : {n.creatorId}, Destinataire : {n.receiverId}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
