import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const parents = await prisma.user.findMany({
      where: { role: "PARENT" },
      select: { id: true, fullname: true },
    });

    return NextResponse.json({ parents });
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur de chargement" },
      { status: 500 }
    );
  }
}
