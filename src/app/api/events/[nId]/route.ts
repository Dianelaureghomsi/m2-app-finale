import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ nId: string }> }
) {
  const { nId } = await params;

  if (!nId) {
    return NextResponse.json(
      { error: "Notification ID is required" },
      { status: 400 }
    );
  }

  try {
    const event = await prisma.notification.findUnique({
      where: {
        id: nId,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ notification: event }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notification:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
