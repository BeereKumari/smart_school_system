import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Notification from "@/app/models/Notification";

export async function GET(req: Request) {

  await connectDB();

  const { searchParams } = new URL(req.url);
  const userType = searchParams.get("userType");

  const data = await Notification.find({ userType })
    .sort({ createdAt: -1 });

  return NextResponse.json(data);
}