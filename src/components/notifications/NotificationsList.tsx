"use client";

import { useEffect, useState } from "react";
import { NoData } from "../NoData";
import { Notification } from "@/src/generated/prisma";
import { Button } from "../Button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";

type Notif = {
  id: string;
  title: string;
  message: string;
  subject: string;
  createdAt: string;
  filePath?: string;
  creator: {
    fullname: string;
    id: string;
  };
};


export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();

        console.log("data new", data);
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des notifications :",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p>Chargement des notifications...</p>;

  if (notifications.length === 0) {
    return <NoData message="Aucune notification reçue" />;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Titre</th>
            <th className="px-4 py-2">Sujet</th>
            <th className="px-4 py-2">Contenu</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Fichier</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notif) => (
            <tr key={notif.id} className="border-t">
              <td className="px-4 py-2 font-medium">{notif.title}</td>
              <td className="px-4 py-2">{notif.subject}</td>
              <td className="px-4 py-2">
                {notif.message.slice(0, 40) + "..."}
              </td>
              <td className="px-4 py-2">
                {new Date(notif.createdAt).toLocaleDateString()}
              </td>
              
              <td className="px-4 py-2">
                {notif.filePath ? (
                  <a
                    href={notif.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Voir le fichier
                  </a>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              <td className="px-4 py-2">
                <Link href={`/m2/dashboard/${user.role.toLowerCase()}/${notif.id}`}>
                  <Button>
                    <div className="text-sm text-white flex items-center px-2 space-x-2">
                      <Eye className="size-4" />
                      <span className="ml-1">Voir</span>
                    </div>
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
