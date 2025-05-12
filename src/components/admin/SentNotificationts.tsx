"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  receiver: {
    name: string;
  };
};

export function SentNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events") // à créer
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Titre</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Envoyé à</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notif) => (
            <tr key={notif.id} className="border-t">
              <td className="px-4 py-2">{notif.title}</td>
              <td className="px-4 py-2">{notif.type}</td>
              <td className="px-4 py-2">{notif.message}</td>
              <td className="px-4 py-2">{notif.receiver.name}</td>
              <td className="px-4 py-2">
                {new Date(notif.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
