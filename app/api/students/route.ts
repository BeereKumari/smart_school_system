import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Student from "@/app/models/Student";
import { generateStudentId } from "@/app/lib/generateStudentId";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const classFilter = searchParams.get("class");
    
    let query = {};
    if (classFilter) {
      query = { classApplying: classFilter };
    }
    
    const students = await Student.find(query).sort({ createdAt: -1 });
    return NextResponse.json(students);
  } catch (error) {
    console.error("STUDENTS API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const {
      studentName,
      dob,
      gender,
      classApplying,
      fatherName,
      motherName,
      phone,
      email,
      studentPhoto
    } = body;

    if (!studentName || !fatherName || !classApplying) {
      return NextResponse.json(
        { message: "Student name, father's name, and class are required" },
        { status: 400 }
      );
    }

    const studentId = await generateStudentId();

    const newStudent = new Student({
      studentId,
      studentName,
      dob,
      gender,
      classApplying,
      fatherName,
      motherName,
      phone,
      email,
      studentPhoto,
      status: "active",
      source: "manual"
    });

    await newStudent.save();
    
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error: any) {
    console.error("CREATE STUDENT ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create student" },
      { status: 500 }
    );
  }
}
