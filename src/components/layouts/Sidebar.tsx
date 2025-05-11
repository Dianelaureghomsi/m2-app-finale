"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const sidebarLinks: Record<string, { label: string; href: string }[]> = {
  parent: [
    { label: "Mes enfants", href: "/dashboard/parent" },
    { label: "Notifications", href: "/dashboard/parent#notifications" },
    { label: "Contacter l'administration", href: "/dashboard/parent#contact" },
  ],
  enseignant: [
    { label: "Envoyer une notification", href: "/dashboard/enseignant" },
    { label: "Élèves & classes", href: "/dashboard/enseignant#classes" },
    { label: "Historique", href: "/dashboard/enseignant#historique" },
  ],
  admin: [
    { label: "Comptes utilisateurs", href: "/dashboard/admin" },
    { label: "Événements", href: "/dashboard/admin#events" },
    { label: "Statistiques", href: "/dashboard/admin#stats" },
  ],
};

export function Sidebar() {
  const { role } = useParams();
  const pathname = usePathname();

  const links = sidebarLinks[role as string] || [];

  return (
    <aside className="w-64 h-screen bg-purple-50 border-r shadow-sm px-4 py-6 space-y-4">
      <h2 className="text-lg font-bold text-purple-700 mb-4 capitalize">
        {role}
      </h2>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded-md text-sm font-medium
              ${
                pathname === link.href
                  ? "bg-purple-200 text-purple-800"
                  : "text-gray-700 hover:bg-purple-100"
              }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
