import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          in: ["PARENT", "ENSEIGNANT"],
        },
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
