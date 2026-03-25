import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Student from "@/app/models/Student";

export async function GET() {
  try {

    await connectDB();

    const students = await Student.find().sort({ createdAt: -1 });

    return NextResponse.json(students);

  } catch (error) {

    console.error("STUDENTS API ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch students" },
      { status: 500 }
    );

  }
}