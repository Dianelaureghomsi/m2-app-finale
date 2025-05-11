"use client";

import { useEffect, useState } from "react";

export function StatsView() {
  const [stats, setStats] = useState({
    totalParents: 0,
    totalEnseignants: 0,
    totalNotifications: 0,
    totalEleves: 0,
  });

  useEffect(() => {
    fetch("/api/stats") // à créer
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm border border-purple-600">
        <h3 className="text-lg font-medium">Notifications envoyées</h3>
        <p className="text-2xl font-semibold text-purple-700">
          {stats.totalNotifications ?? 0}
        </p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm border border-purple-600">
        <h3 className="text-lg font-medium">Parents inscrits</h3>
        <p className="text-2xl font-semibold text-purple-700">
          {stats.totalParents ?? 0}
        </p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm border border-purple-600">
        <h3 className="text-lg font-medium">Enseignants inscrits</h3>
        <p className="text-2xl font-semibold text-purple-700">
          {stats.totalEnseignants ?? 0}
        </p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm border border-purple-600">
        <h3 className="text-lg font-medium">Élèves enregistrés</h3>
        <p className="text-2xl font-semibold text-purple-700">
          {stats.totalEleves ?? 0}
        </p>
      </div>
    </div>
  );
}
