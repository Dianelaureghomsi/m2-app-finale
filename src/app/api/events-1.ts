import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Subjects } from "@/src/generated/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = new IncomingForm({ keepExtensions: true });

  return new Promise((resolve) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        console.error("Erreur formidable :", err);
        return resolve(
          NextResponse.json({ error: "Erreur de parsing du formulaire" }, { status: 500 })
        );
      }

      const { title, message, subject, creatorId, parentIds, classes } = fields;

      // Validation des champs requis
      if (!title || !message || !subject || !creatorId || !parentIds || !classes) {
        return resolve(
          NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
        );
      }

      const subjectValue = subject.toString().toUpperCase();

      if (!Object.values(Subjects).includes(subjectValue as Subjects)) {
        return resolve(
          NextResponse.json({ error: "Sujet invalide" }, { status: 400 })
        );
      }

      let filePath = "";

      if (files.file && Array.isArray(files.file)) {
        const file = files.file[0];
        const uploadDir = path.join(process.cwd(), "public/uploads");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}_${file.originalFilename}`;
        const fullPath = path.join(uploadDir, fileName);

        fs.renameSync(file.filepath, fullPath);
        filePath = `/uploads/${fileName}`;
      }

      try {
        const notification = await prisma.notification.create({
          data: {
            title: title.toString(),
            message: message.toString(),
            subject: subjectValue as Subjects,
            creator: { connect: { id: creatorId.toString() } },
            targetedParents: JSON.parse(parentIds.toString()),
            targetedClasses: JSON.parse(classes.toString()),
            filePath,
          },
        });

        return resolve(NextResponse.json({ success: true, notification }, { status: 201 }));
      } catch (error) {
        console.error("Erreur Prisma :", error);
        return resolve(NextResponse.json({ error: "Erreur serveur" }, { status: 500 }));
      }
    });
  });
}
