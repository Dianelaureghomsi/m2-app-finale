"use client";

import { ForumChatRoom } from "@/src/components/forum/ForumChatRoom";
import { DashboardNavbar } from "@/src/components/layouts/DashboardNavbar";
import { LinkButton } from "@/src/components/layouts/LinkButton";
import { useAuth } from "@/src/hooks/useAuth";
import { redirect, RedirectType } from "next/navigation";

export default function Forum() {
  const { user } = useAuth();

  if (!user) return redirect("/m2/connexion", RedirectType.replace);

  return (
    <div className="w-full">
      <DashboardNavbar />

      <section className="px-60 py-20 space-y-5">
        <LinkButton />
        <h2 className="text-4xl font-bold text-purple-600">
          Forum de discussion
        </h2>

        <ForumChatRoom />
      </section>
    </div>
  );
}
