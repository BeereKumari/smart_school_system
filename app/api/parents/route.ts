import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Parent from "@/app/models/Parent";

export async function GET() {
  try {
    await connectDB();
    const parents = await Parent.find().sort({ createdAt: -1 });
    return NextResponse.json(parents);
  } catch (error) {
    console.error("PARENTS API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch parents" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const parent = await Parent.create(body);
    return NextResponse.json(parent);
  } catch (error) {
    console.error("PARENT CREATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create parent" },
      { status: 500 }
    );
  }
}
