import prisma from "@/lib/prisma";
import { log } from "console";
import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { send } from "process";

// Handler pour envoyer un message
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File | null;
  const content = formData.get("content") as string | null;
  const senderId = formData.get("senderId") as string | null;

  console.log({content, file, senderId})

  try {
    if (!content || !senderId) {
      return NextResponse.json(
        { error: "Content and senderId are required" },
        { status: 400 }
      );
    }

    async function saveFile(file: File | null) {
      if (!file) return { filePath: null };

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      await writeFile(path.join(uploadDir, fileName), buffer);

      return { filePath: `/uploads/${fileName}` };
    }

    const { filePath } = await saveFile(file);

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        filePath:filePath || undefined
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    console.log({SendMessageError:error})
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler pour récupérer tous les messages
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      include: {
        sender: true, // Inclure les informations sur l'expéditeur
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
