import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Notification from "@/app/models/Notification";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    await Notification.findByIdAndUpdate(id, { read: true });

    return NextResponse.json({ message: "Marked as read" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark as read" }, { status: 500 });
  }
}
