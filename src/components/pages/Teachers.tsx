"use client";

import { ClassView } from "@/src/components/teachers/ClassView";
import { NotificationSection } from "@/src/components/notifications/NotificationSection";
import { Banner } from "../Banner";
import { Button } from "../Button";
import Link from "next/link";

export function TeacherPage() {
  return (
    <div className="px-32 py-6 space-y-8">
      <Banner />

      <div className="w-full flex justify-end my-4">
        <Link href="/m2/forum" className="w-52">
          <Button variant="outlined">Continuer vers le forum</Button>
        </Link>
      </div>
      
      <section>
        <NotificationSection
          canCreate
          label="Liste des notifications"
          type="personal"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Élèves & classes</h2>
        <ClassView />
      </section>
    </div>
  );
}
