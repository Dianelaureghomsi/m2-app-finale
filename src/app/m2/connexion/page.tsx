"use client";                     // indique que ce composant doit etre rendu cote client.

import { Fragment, useState } from "react";
import { Button } from "@/src/components/Button";
import { Divider } from "@/src/components/Divider";
import { Input } from "@/src/components/Input";
import { useRouter } from "next/navigation";        //pour naviguer programmatiquement dans next.js.
import { useAuth } from "@/src/hooks/useAuth";           //pour gerer les erreurs d'authetification
import { MessageCard } from "@/src/components/Messages";
import { Navbar } from "@/src/components/layouts/Navbar";
import { ArrowLeft } from "lucide-react";           //icone de fleche(librerie lucide-react)
import Link from "next/link";          // permet de naviguer sans recharger de page

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { login, loading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // vérifie si tous les champs sont remplis
    if (!email || !password ){
      return alert("Remplis tous les champs obligatoires")
    }
    
    login({ email, password });
  };

  return (
    <Fragment>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-w-[480px] w-full flex flex-col space-y-4">
          <div className="flex flex-col w-full max-h-[500px] space-y-4 shadow-lg rounded-lg py-6 px-9">
            <form className="flex flex-col w-full h-full space-y-4">
              {error && <MessageCard type="error" content={error} />}
              <h2 className="mb-10 font-bold text-2xl text-gray-600">
                Connexion
              </h2>

              <Input
                label="Email"
                value={email}
                setValue={(e) => setEmail(e.target.value)}
                border-2
                border-purple-400
                htmlId="login-email"
                type="email"
                placeholder="johndoe@example.xyz"
              />

              <Input
                label="Mot de passe"
                value={password}
                setValue={(e) => setPassword(e.target.value)}
                htmlId="login-password"
                type="password"
                placeholder="**************"
              />

              <Divider />

              <Button
                loading={loading}
                type="submit"
                onClick={(e) => {
                  console.log(email, password);
                  handleSubmit(e);
                }}
              >
                Se connecter
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <span className="text-gray-600"> Pas de compte ? </span>
              <button
                type="submit"
                onClick={() => router.push("/m2/inscription")}
                className="text-purple-600 fond-semibold hover:underline transition text-sm"
              >
                S'inscrire
              </button>
            </div>
          </div>

          <Link href="/" className="self-start flex justify-start mb-4">
            <Button variant="link">
              <ArrowLeft size={20} className="mr-2" />
              Vers l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
