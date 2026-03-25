import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Notification from "@/app/models/Notification";

export async function POST() {

  await connectDB();

  await Notification.updateMany(
    { userType: "admin", read: false },
    { $set: { read: true } }
  );

  return NextResponse.json({ message: "Marked as read" });
}