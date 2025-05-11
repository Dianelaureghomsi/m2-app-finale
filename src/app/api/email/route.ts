import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdirSync, existsSync } from "fs";
const nodemailer = require("nodemailer");

const isAfternoon = new Date().getHours() >= 14;
const isBeforeMorning = new Date().getHours() <= 6;

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const subject = formData.get("subject")?.toString();
  const message = formData.get("message")?.toString();
  const file = formData.get("file") as File | null;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Tous les champs requis n'ont pas été fournis." },
      { status: 400 }
    );
  }

  let attachment: { filename: string; path: string } | null = null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, file.name);
    await writeFile(filePath, buffer);

    attachment = {
      filename: file.name,
      path: filePath,
    };
  }

  const emailContent = {
    from: `kembeudaniel2@gmail.com`,
    to: email,
    subject,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #6B46C1; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">${
            isAfternoon && isBeforeMorning ? "Bonsoir" : "Bonjour"
          } M/Mme ${name},</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p style="margin: 0 0 10px;">${message}</p>
          <p style="margin: 0;">Cordialement,</p>
          <p style="margin: 0; font-weight: bold;">L'équipe EschoolConnect</p>
        </div>
        <div style="background-color: #6B46C1; color: white; padding: 10px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">&copy; 2025 | eschoolconnect. Tous droits réservés.</p>
        </div>
      </div>
    </div>
    `,
    attachments: attachment ? [attachment] : [],
    headers: {
      "X-Entity-Ref-ID": "new-mail",
    },
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "dianelaureghomsi@gmail.com",
      pass: "ysgg xjon yxws uewh",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail(emailContent);
    return NextResponse.json({ message: "Email envoyé avec succès." }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur d'envoi de mail:", error.message);
    return NextResponse.json({ error: "Échec de l'envoi de l'email." }, { status: 500 });
  }
}
