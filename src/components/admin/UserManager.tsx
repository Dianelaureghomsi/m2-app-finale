"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/Button";
import { Button as ShadButton } from "@/src/components/ui/button";
import { Input } from "../Input";
import { Plus, Trash2 } from "lucide-react";
import { DialogForm } from "../DialogForm";
import { User } from "@/src/generated/prisma";

export function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PARENT");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("/api/users/all")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []));
  }, [refresh]);

  const handleCreate = async () => {
    if (!name || !email || !phone || !password || !role) return;

    setLoading(true);
    const res = await fetch("/api/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setPhone("");
      setRole("PARENT");
      setRefresh(!refresh);
    }

    setLoading(false);
  };

  if (loading) return <p>Chargement en cours...</p>;

  return (
    <div className="space-y-6">
      <DialogForm
        buttonLabel="Ajouter un utilisateur"
        title="Création d'un utilisateur"
        onSubmit={handleCreate}
        label="Les utilisateurs"
      >
        <form className="space-y-2">
          <Input
            label="Nom complet"
            placeholder="Nom"
            value={name}
            setValue={(e) => setName(e.target.value)}
          />

          <Input
            label="Adresse mail"
            placeholder="Email"
            value={email}
            setValue={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Téléphone"
            placeholder="Ajoutez un numéro..."
            value={phone}
            setValue={(e) => setPhone(e.target.value)}
          />

          <Input
            label="Mot de passe"
            placeholder="Créez un mot de passe pour l'utilisateur"
            value={password}
            setValue={(e) => setPassword(e.target.value)}
          />

          <select
            className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="PARENT">Parent</option>
            <option value="ENSEIGNANT">Enseignant</option>
          </select>
        </form>
      </DialogForm>

      {/* Liste des utilisateurs */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 mt-4">
          <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Rôle</th>
              <th className="px-4 py-2">Date d'enregistrement</th>
              {/* <th className="px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2 font-medium">{u.fullname}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.phone ?? "--"}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2">
                  {}
                </td>
                {/* <td className="px-4 py-2">
                  {/* <ShadButton>
                    <Trash2 />
                  </ShadButton> 
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
