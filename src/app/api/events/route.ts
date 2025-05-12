// /app/api/events/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { Subjects } from "@/src/generated/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title")?.toString();
  const message = formData.get("message")?.toString();
  const subject = formData.get("subject")?.toString() as Subjects;
  const creatorId = formData.get("creatorId")?.toString();
  const parentIds = formData.get("parentIds")?.toString(); // JSON string
  const classes = formData.get("classes")?.toString(); // JSON string
  const file = formData.get("file") as File;

  if (!title || !message || !subject || !creatorId || !parentIds || !classes) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  let filePath = "";

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}_${file.name}`;
    const fullPath = path.join(uploadDir, fileName);
    await fs.writeFile(fullPath, buffer);
    filePath = `/uploads/${fileName}`;
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        subject,
        filePath,
        creator: {
          connect: { id: creatorId },
        },
        targetedParents: JSON.parse(parentIds),
        targetedClasses: JSON.parse(classes),
      },
    });

    return NextResponse.json({ success: true, notification }, { status: 201 });
  } catch (error) {
    console.error("Erreur Prisma :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        creator: true,
      },
    });
    console.log({notifications});
    return NextResponse.json({ notifications });
    
  } catch (error){
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
