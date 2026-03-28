import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Student from "@/app/models/Student";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const student = await Student.findById(id);
    
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    
    return NextResponse.json(student);
  } catch (error: any) {
    console.error("GET STUDENT ERROR:", error);
    return NextResponse.json({ message: error.message || "Failed to fetch student" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    
    console.log("PATCH - Updating student:", id);
    console.log("PATCH - Body:", body);
    
    const student = await Student.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      console.log("PATCH - Student not found:", id);
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    
    console.log("PATCH - Updated successfully:", student);
    return NextResponse.json(student);
  } catch (error: any) {
    console.error("PATCH STUDENT ERROR:", error);
    return NextResponse.json({ message: error.message || "Failed to update student" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    console.log("DELETE - Deleting student:", id);
    
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
      console.log("DELETE - Student not found:", id);
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    
    console.log("DELETE - Deleted successfully:", id);
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error: any) {
    console.error("DELETE STUDENT ERROR:", error);
    return NextResponse.json({ message: error.message || "Failed to delete student" }, { status: 500 });
  }
}
