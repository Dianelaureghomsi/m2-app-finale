// Connexion d'un utilisateur.

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({
      error: "Email et mot de passe requis",
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé", status: 404 });
  }

  const match = password === user.password;

  if (!match) {
    return NextResponse.json({ error: "Mot de passe incorrect", status: 401 });
  }

  return NextResponse.json({
    success: true,
    user,
  });
}
