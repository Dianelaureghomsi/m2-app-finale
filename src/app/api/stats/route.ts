import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalParents, totalEnseignants, totalEleves, totalNotifications] =
      await Promise.all([
        prisma.user.count({ where: { role: "PARENT" } }),
        prisma.user.count({ where: { role: "ENSEIGNANT" } }),
        prisma.eleve.count(),
        prisma.notification.count(),
      ]);

    return NextResponse.json({
      totalParents,
      totalEnseignants,
      totalEleves,
      totalNotifications,
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
