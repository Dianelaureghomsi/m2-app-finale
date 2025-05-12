"use client";

import { useEffect, useState } from "react";
import { Input } from "../Input";
import { NoData } from "../NoData";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "../Messages";
import {
  ListeClasses,
  Notification,
  Subjects,
  User,
} from "@/src/generated/prisma"; // Importez l'enum ListeClasses
import { DialogForm } from "../DialogForm";
import { useUser } from "@/src/hooks/useUser";

type NotificationProps = {
  label: string;
  canCreate: boolean;
  type?: "personal" | "global";
};

export function NotificationSection({
  label,
  canCreate,
  type = "global",
}: Partial<NotificationProps>) {
  const DEFAULT_TIMEOUT = 5000;

  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [parents, setParents] = useState<User[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("EVENEMENT");
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log({data});
        if (!(type === "global")) {
          const filteredNotifications = data?.notifications?.filter(
            (e: Notification) => e.creatorId === user.id
          );
          setNotifications(filteredNotifications);
        } else {
          setNotifications(data.notifications || []);
        }
        setLoading(false);
      });

    // Récupérer la liste des parents
    fetch("/api/users/parents")
      .then((res) => res.json())
      .then((data) => {
        setParents(data.parents || []);
        setLoading(false);
      });

    return () => {
      setLoading(false);
    };
  }, [refresh]);


    const handleSubmit = async () => {
    setFormLoading(true);

    if (
      !title ||
      !message ||
      !subject ||
      selectedParents.length === 0 ||
      selectedClasses.length === 0
    ) {
      setError("Tous les champs sont requis !");
      setTimeout(() => {
        setError("");
        setFormLoading(false);
      }, DEFAULT_TIMEOUT);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("subject", subject);
    formData.append("creatorId", user.id);
    formData.append("parentIds", JSON.stringify(selectedParents));
    formData.append("classes", JSON.stringify(selectedClasses));
    if (file) formData.append("file", file);
    console.log(formData.getAll)
    const res = await fetch("/api/events", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setTitle("");
      setMessage("");
      setSubject("EVENEMENT");
      setSelectedParents([]);
      setSelectedClasses([]);
      setFile(null);
      setRefresh(!refresh);
      setFormLoading(false);
    } else {
      setError("Erreur lors de la création de la notification.");
      setTimeout(() => {
        setError("");
        setFormLoading(false);
      }, DEFAULT_TIMEOUT);
    }
  };


  if (loading) return <p>Chargement des classes...</p>;

  return (
    <div className="space-y-6">
      {/* {error && <MessageCard type="error" content={error} />} */}
      {canCreate && (
        <DialogForm
          title="Créer une notification"
          subTitle="Remplissez les champs pour créer une nouvelle notification."
          label={label!}
          onSubmit={handleSubmit}
          buttonLabel="Créer la notification"
          loading={formLoading}
        >
          <form className="space-y-2">
            {error && <MessageCard type="error" content={error} />}
            <Input
              label="Titre"
              placeholder="Titre de la notification"
              value={title}
              setValue={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="border-2 focus:border-purple-600 p-2 w-full rounded"
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
              <option value="--">--</option>
              {Object.values(Subjects).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              multiple
              className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
              value={selectedParents}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );

                if (selectedOptions.includes("ALL")) {
                  // Si "Tous les parents" est sélectionné, ajoutez tous les IDs des parents
                  setSelectedParents(parents.map((parent) => parent.id));
                } else {
                  setSelectedParents(selectedOptions);
                }
              }}
            >
              <option value="ALL">Tous les parents</option>
              {parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.fullname}
                </option>
              ))}
            </select>

            <select
              multiple
              className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
              value={selectedClasses}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );

                if (selectedOptions.includes("ALL")) {
                  // Si "Toutes les classes" est sélectionnée, ajoutez toutes les classes
                  setSelectedClasses(Object.values(ListeClasses));
                } else {
                  setSelectedClasses(selectedOptions);
                }
              }}
            >
              {Object.values(ListeClasses).map((classe) => (
                <option key={classe} value={classe}>
                  {classe}
                </option>
              ))}
            </select>

            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                } else {
                  setFile(null);
                }
              }}
              className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200"
            />
          </form>
        </DialogForm>
      )}

      <div>
        {notifications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notifications.map((n) => (
              <NotificationCard key={n.id} event={n} />
            ))}
          </div>
        ) : (
          <NoData message="Aucune notification enregistrée pour le moment." />
        )}
      </div>
    </div>
  );
}

function NotificationCard({ event }: { event: Notification }) {
  const { user } = useUser(event.creatorId);

  return (
    <div className="border-2 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <h4 className="font-semibold text-md mb-2">{event.title}</h4>
      <p className="text-sm text-gray-600 mb-2">{event.message}</p>
      <p className="text-xs text-gray-500 mb-1">
        <strong>Sujet:</strong> {event.subject}
      </p>
      <p className="text-xs text-gray-500 mb-1">
        <strong>Créateur:</strong> {user?.fullname}
      </p>
      <p className="text-xs text-gray-400">
        <strong>Créé le:</strong>{" "}
        {new Date(event.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
