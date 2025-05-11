"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RoleLayoutProps = React.PropsWithChildren;

export default function RoleLayout({ children }: RoleLayoutProps) {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/m2/connexion");
    }
  }, [loading, user]);

  return <section className="px-32">{children}</section>;
}
