import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const eleves = await prisma.eleve.findMany();

    return NextResponse.json({ eleves });
  } catch (err) {
    return NextResponse.json({
      error: "Erreur de récupération des élèves",
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { fullname, parentId, classe } = await req.json();

    const eleve = await prisma.eleve.create({
      data: {
        fullname,
        parentId,
        classe,
      },
    });

    return NextResponse.json({ eleve }, { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      error: "Erreur de création de l'élève",
      status: 500,
    });
  }
}
