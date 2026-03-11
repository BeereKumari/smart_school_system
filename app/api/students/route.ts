import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";

import Student from "@/app/models/Student";
import Parent from "@/app/models/Parent"; // IMPORTANT: register Parent schema

export async function GET() {
  try {

    await connectDB();

    // Ensure Parent model is registered
    Parent;

    const students = await Student.find()
      .populate({
        path: "parentId",
        model: "Parent"
      });

    return NextResponse.json(students);

  } catch (error) {

    console.error("STUDENTS API ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch students" },
      { status: 500 }
    );

  }
}