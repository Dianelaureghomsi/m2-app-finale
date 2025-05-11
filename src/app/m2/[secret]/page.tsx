"use client";

import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SecretPage() {
  const { secret } = useParams();
  const router = useRouter();
  const SECRET_WORD = "chat";
  const isValidSecret = secret === SECRET_WORD;

  console.log(secret);
  console.log(SECRET_WORD);

  useEffect(() => {
    let timeout: any;
    if (isValidSecret) {
      timeout = setTimeout(() => {
        router.push("/m2/admin");
      }, 1000);
    } else {
      timeout = setTimeout(() => {
        router.push("/m2/inscription");
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [secret]);

  if (!isValidSecret)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 size={80} className="animate-spin text-purple-600" />
      </div>
    );

  return (
    <div className="px-32 py-6 space-y-8 flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Bienvenue !</h1>
      <p>
        Vous serez redirigé vers la page d'inscription pour administrateur après
        2s.
      </p>
    </div>
  );
}
