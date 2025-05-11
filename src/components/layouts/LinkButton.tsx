"use client";

import Link, { LinkProps } from "next/link";
import { Button } from "../Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type LinkButtonProps = {
  to?: Pick<LinkProps, "href">["href"];
  label?: string;
};
export function LinkButton({ to, label }: LinkButtonProps) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-start">
      {to ? (
        <Link href={to} className="self-start flex justify-start mb-4">
          <Button variant="link" onClick={to ? () => {} : () => router.back()}>
            <ArrowLeft size={20} className="mr-2" />
            {label ?? "Vers l'accueil"}
          </Button>
        </Link>
      ) : (
        <Button variant="link" onClick={() => router.back()}>
          <ArrowLeft size={20} className="mr-2" />
          {label ?? "Vers l'accueil"}
        </Button>
      )}
    </div>
  );
}
