"use client";

import { useEffect, useState } from "react";
import { NoData } from "../NoData";
import { useAuth } from "@/src/hooks/useAuth";
import { DialogForm } from "../DialogForm";
import { MessageCard } from "../Messages";
import { Eleve, ListeClasses } from "@/src/generated/prisma";
import { Label } from "../ui/label";
import { Input } from "../Input";

export function StudentList() {
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [classLabel, setClassLabel] = useState<ListeClasses>();
  const [fullname, setFullname] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const DEFAULT_TIMEOUT = 5000;

  useEffect(() => {
    const fetchMyStudents = async () => {
      try {
        const response = await fetch(`/api/eleves/${user.id}`);

        if (!response.ok) {
          setError("Erreur de récupération des élèves");
          throw new Error("Erreur de récupération des élèves");
        }
        const data = await response.json();
        setEleves(data.eleves || []);
      } catch (error) {
        setError("Erreur de récupération des élèves");
        // Log the error for debugging
        console.error("Erreur:", error);
        setEleves([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudents();
    // Cleanup function to reset state if needed
    return () => {
      setEleves([]);
    };
  }, []);

  const registerStudent = () => {
    if (!fullname || !classLabel) {
      setFormError("Veuillez remplir tous les champs.");
      setTimeout(() => {
        setFormError(""), DEFAULT_TIMEOUT;
      });

      return;
    }

    alert(fullname + classLabel);

    setFormError("");

    fetch("/api/eleves/all", {
      method: "POST",
      body: JSON.stringify({
        fullname,
        parentId: user.id,
        classe: classLabel,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setFormError("Erreur lors de l'enregistrement de l'élève");
        }
        return response.json();
      })
      .then(() => {
        setFullname("");
        setClassLabel(undefined);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setFormError(
          "Une erreur s'est produite lors de l'enregistrement de l'élève."
        );
        setTimeout(() => {
          setFormError(""), DEFAULT_TIMEOUT;
        });
      });
  };

  if (loading) return <p>Chargement des élèves...</p>;

  return (
    <div className="overflow-x-auto space-y-4">
      {error && <MessageCard type="error" content={error} />}

      <DialogForm
        label="Mes enfants"
        title="Enregistrer un nouvel élève"
        subTitle="Remplissez les champs pour créer un nouvel élève."
        buttonLabel="Créer l'élève"
        onSubmit={registerStudent}
      >
        <form className="space-y-2">
          {formError && <MessageCard type="error" content={formError} />}
          <Input
            label="Nom de l'élève"
            placeholder="Nom complet de l'élève"
            value={fullname}
            setValue={(e) => setFullname(e.target.value)}
          />
          <Label>Classe</Label>
          <select
            className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
            value={classLabel}
            onChange={(e) => setClassLabel(e.target.value as ListeClasses)}
          >
            <option value="--">--</option>
            {Object.values(ListeClasses).map((classe) => (
              <option key={classe} value={classe}>
                {classe}
              </option>
            ))}
          </select>
        </form>
      </DialogForm>

      {!(eleves.length === 0) ? (
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Classe</th>
              <th className="px-4 py-2">Date d'enregistrement</th>
            </tr>
          </thead>
          <tbody>
            {eleves.map((el) => (
              <tr key={el.id} className="border-t">
                <td className="px-4 py-2 font-medium text-purple-700">
                  {el.id}
                </td>
                <td className="px-4 py-2 font-medium">
                  {el.fullname}
                </td>
                <td className="px-4 py-2">{el.classe}</td>
                <td className="px-4 py-2">
                  {new Date(el.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoData message="Aucun enfant trouvé pour ce compte." />
      )}
    </div>
  );
}
