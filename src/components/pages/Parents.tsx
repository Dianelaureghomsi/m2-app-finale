import { RequestForm } from "@/src/components/request/RequestForm";
import { StudentList } from "@/src/components/eleves/StudentsList";
import { NotificationList } from "@/src/components/notifications/NotificationsList";
import { Banner } from "../Banner";
import { Button } from "../Button";
import Link from "next/link";

export function ParentPage() {
  return (
    <div className="py-6 space-y-8 px-32">
      <Banner />

      <div className="w-full flex justify-end my-4">
        <Link href="/m2/forum" className="w-52">
          <Button variant="outlined">Continuer vers le forum</Button>
        </Link>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">Mes notifications</h2>
        <NotificationList />
      </section>
      
      <StudentList />

      <section>
        <h2 className="text-lg font-semibold mb-2">
          Contacter l'administration
        </h2>
        <RequestForm />
      </section>
    </div>
  );
}
