"use client";

import { useEffect, useState } from "react";
import { NoData } from "../NoData";
import { Eleve } from "@/src/generated/prisma";
import { useUser } from "@/src/hooks/useUser";

export function ClassView() {
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/eleves/all")
      .then((res) => res.json())
      .then((data) => setEleves(data.classes || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des classes...</p>;

  return (
    <div className="space-y-6">
      {eleves.length === 0 ? (
        <NoData message="Aucune classe disponible pour le moment." />
      ) : (
        eleves.map((eleve) => (
          <div key={eleve.id}>
            {/* <h3 className="text-lg font-semibold text-purple-700">
              {eleve.fullname}
            </h3> */}
            <table className="min-w-full text-sm border border-gray-200 mt-2">
              <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nom</th>
                  <th className="px-4 py-2">Parent</th>
                  <th className="px-4 py-2">Date d'enregistrement</th>
                </tr>
              </thead>
              <StudentRows key={eleve.id} student={eleve} />
            </table>
          </div>
        ))
      )}
    </div>
  );
}

function StudentRows({ student }: { student: Eleve }) {
  const { user: parent } = useUser(student.parentId);

  if (!parent) return <span>Chargement...</span>;

  return (
    <tbody>
      <tr className="border-t">
        <td className="px-4 py-2">{student.id}</td>
        <td className="px-4 py-2">{student.fullname}</td>
        <td className="px-4 py-2">{parent.fullname}</td>
        <td className="px-4 py-2">
          {new Date(student.createdAt).toLocaleDateString()}
        </td>
      </tr>
    </tbody>
  );
}
