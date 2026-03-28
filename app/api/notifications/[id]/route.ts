import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Notification from "@/app/models/Notification";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    await Notification.findByIdAndUpdate(params.id, { read: true });

    return NextResponse.json({ message: "Marked as read" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark as read" }, { status: 500 });
  }
}
