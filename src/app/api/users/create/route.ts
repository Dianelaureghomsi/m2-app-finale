import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { fullname, email, role, password } = body;

  if (!fullname || !email || !role) {
    return NextResponse.json(
      { error: "Champs requis manquants" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      fullname,
      email,
      role,
      password,
    },
  });

  return NextResponse.json({ success: true, user });
}
