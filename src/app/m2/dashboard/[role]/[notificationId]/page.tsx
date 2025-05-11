"use client";

import { Notification } from "@/src/generated/prisma";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { Button } from "@/src/components/Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";

export default function Notifications() {
  const { notificationId } = useParams();
  const [notification, setNotification] = useState<Notification | null>(null);

  const router = useRouter();

  const { user: authUser } = useUser(notification?.creatorId!);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(`/api/events/${notificationId}`);
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Notification data:", data);
        setNotification(data.notification);
      } catch (error) {
        console.error("Error fetching notification:", error);
        setNotification(null);
      }
    };

    fetchNotification();
  }, []);

  return (
    <div className="w-full p-40 flex flex-col items-center mt-3">
      <div className="max-w-[42rem] w-full flex flex-col space-y-4">
        <div className="self-start flex justify-start mb-4">
          <Button variant="link" onClick={() => router.back()}>
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
        </div>
        <div className="p-12 bg-purple-50">
          {notification ? (
            <div className="flex flex-col space-y-2 items-center text-center">
              <span className="max-w-fit text-white text-sm rounded-full px-4 py-1 bg-purple-600">
                {notification.subject}
              </span>

              <h2 className="text-3xl font-bold text-purple-600 text-center">
                {notification.title}
              </h2>
              <p className="text-lg text-gray-600 mt-7">
                {notification.message}
              </p>

              <div className="flex flex-col items-center mt-8">
                <span>Envoyée par</span>
                {authUser ? (<span className="font-bold text-xl text-purple-600">{authUser?.fullname}</span>): (
                  <Loader2Icon className="rotate-180 transition-all animate-spin" />
                )}
                <p className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString()}{" "}
                  {new Date(notification.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading notification...</p>
          )}
        </div>
      </div>
    </div>
  );
}
