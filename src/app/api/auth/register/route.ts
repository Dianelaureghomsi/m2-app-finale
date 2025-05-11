// Inscription d'un utilisateur.

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Role } from "@/src/generated/prisma";

export async function POST(req: Request) {
  try {
    console.log("Requête reçue");
    const body = await req.json();
    console.log("Corps de la requête :", body);

    const { fullname, email, password, phone, role } = body;

    if (!fullname || !email || !password || !role) {
      console.log("Champs obligatoires manquants");
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    if (!Object.values(Role).includes(role)) {
      console.log("Rôle invalide :", role);
      return NextResponse.json({ error: "Rôle invalide" }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      console.log("Utilisateur déjà existant :", email);
      return NextResponse.json(
        { error: "Email déjà utilisé" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password,
        role,
        phone: phone || null,
      },
    });

    console.log("Utilisateur créé :", user);

    return NextResponse.json(
      { message: "Inscription réussie", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur dans l'API :", error.message); // Loggez les erreurs
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
