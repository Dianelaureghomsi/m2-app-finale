"use client";

import { DashboardNavbar } from "@/src/components/layouts/DashboardNavbar";
import { AdminPage } from "@/src/components/pages/Admin";
import { ParentPage } from "@/src/components/pages/Parents";
import { TeacherPage } from "@/src/components/pages/Teachers";
import { Roles } from "@/src/types";
import { useParams } from "next/navigation";

export default function Role() {
  const { role } = useParams();

  function renderRoleComponent(role: Roles) {
    switch (role) {
      case "admin":
        return <AdminPage />;
      case "enseignant":
        return <TeacherPage />;
      case "parent":
        return <ParentPage />;
      default:
        return (
          <div className="text-3xl font-bold w-full h-full flex items-center justify-center">
            Invalid role
          </div>
        );
    }
  }

  return (
    <div className="flex">
      <main className="flex-1 overflow-y-auto p-4">
        {renderRoleComponent(role as Roles)}
      </main>
    </div>
  );
}
