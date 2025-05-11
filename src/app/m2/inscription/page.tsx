"use client";

import { Fragment, useState } from "react";
import { Button } from "@/src/components/Button";
import { Divider } from "@/src/components/Divider";
import { Input } from "@/src/components/Input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "@/src/components/Messages";
import { Role } from "@/src/generated/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LinkButton } from "@/src/components/layouts/LinkButton";

const roles: Role[] = ["PARENT", "ENSEIGNANT"];

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role | null>(null);

  const router = useRouter();

  const { register, loading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    // Empeche la page de se recharger apres que le formulaire ait ete envoyé.
    e.preventDefault();

    if (!role) return alert("Sélectionne un rôle");

    ////////////////////Ajout/////////////////
    //vérifie la syntaxe de l'adresse mail 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
      return alert("Adresse e-mail invalide");
    }
    
    //Vérifie la syntaxe du numéro
    const phoneRegex = /^(?:\+237|0)?6\d{8}$/;
    if (!phoneRegex.test(phone)){
      return alert("Numéro de téléphone invalide. Format attendu +2376xxxxxxxx");
    }

    // vérifie si tous les champs sont remplis
    if (!fullName || !email || !password || !phone){
      return alert("Remplis tous les champs obligatoires")
    }
    ////////////////////Ajout/////////////////

    register({
      fullname: fullName,
      email,
      password,
      role,
      phone,
    });
  };

  return (
    <Fragment>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-w-[480px] w-full flex flex-col space-y-4">
          <form className="flex flex-col w-full space-y-4 shadow-lg rounded-lg p-6">
            {error && <MessageCard type="error" content={error} />}

            <h2 className="font-bold text-2xl text-gray-600">Inscription</h2>

            <Input
              label="Nom complet*"
              value={fullName}
              setValue={(e) => setFullName(e.target.value)}
              htmlId="register-fullname"
              placeholder="John Doe"
            />

            <Input
              label="Email*"
              value={email}
              setValue={(e) => setEmail(e.target.value)}
              htmlId="register-email"
              type="email"
              placeholder="johndoe@example.do"
            />

            <Input
              label="Téléphone*"
              value={phone}
              setValue={(e) => setPhone(e.target.value)}
              htmlId="register-phone"
              type="email"
              placeholder="+2376xxxxxxxx"
            />

            <Input
              label="Mot de passe*"
              value={password}
              setValue={(e) => setPassword(e.target.value)}
              htmlId="register-password"
              type="password"
              placeholder="*********"
            />

            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-gray-700">
                Je suis :
              </span>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => (
                  <Button
                    key={r}
                    variant={role === r ? "default" : "outlined"}
                    onClick={() => setRole(r)}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()}
                  </Button>
                ))}
              </div>
              {/* 
            <div className="text-sm text-gray-500 text-center">
              Rôle sélectionné : {role || "Aucun"}
            </div> */}
            </div>

            <Divider />

            <Button
              loading={loading}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Créer un compte
            </Button>
            

            <div className="text-center text-sm">
              <span className="text-gray-600">Déjà inscrit ? </span>
              <button
                //variant="link"
                type="button"
                onClick={() => router.push("/m2/connexion")}
                className="text-purple-600 font-semibold hover:underline transition text-sm"
              >
                Se connecter
              </button>
            </div>
          </form>
          <LinkButton to="/" />
        </div>
      </div>
    </Fragment>
  );
}
