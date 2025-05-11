"use client";

import { Fragment, useState } from "react";
import { Button } from "@/src/components/Button";
import { Divider } from "@/src/components/Divider";
import { Input } from "@/src/components/Input";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "@/src/components/Messages";
import { Role } from "@/src/generated/prisma";

// const roles: Role[] = ["ADMIN", "PARENT", "ENSEIGNANT"];

export default function AdminRegister() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, loading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    // Empeche la page de se recharger apres que le formulaire ait ete envoyé.
    e.preventDefault();

    register({
      fullname: fullName,
      email,
      password,
      role: "ADMIN" as Role,
      phone,
    });
  };

  return (
    <Fragment>
      <div className="w-full h-screen flex items-center justify-center">
        <form className="flex flex-col max-w-[480px] w-full space-y-4 shadow-lg rounded-lg p-6">
          {error && <MessageCard type="error" content={error} />}

          <h2 className="font-bold text-2xl text-gray-600">Inscription Administateur</h2>

          <Input
            label="Nom complet"
            value={fullName}
            setValue={(e) => setFullName(e.target.value)}
            htmlId="register-fullname"
            placeholder="John Doe"
          />

          <Input
            label="Email"
            value={email}
            setValue={(e) => setEmail(e.target.value)}
            htmlId="register-email"
            type="email"
            placeholder="johndoe@example.do"
          />

          <Input
            label="Téléphone"
            value={phone}
            setValue={(e) => setPhone(e.target.value)}
            htmlId="register-phone"
            type="email"
            placeholder="+237 6xxxxxxxx"
          />

          <Input
            label="Mot de passe"
            value={password}
            setValue={(e) => setPassword(e.target.value)}
            htmlId="register-password"
            type="password"
            placeholder="*********"
          />

          <Divider />

          <Button
            loading={loading}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Créer un compte administrateur
          </Button>
        </form>
      </div>
    </Fragment>
  );
}
