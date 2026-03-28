import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Teacher from "@/app/models/Teacher";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const teacher = await Teacher.findById(params.id);
    
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching teacher" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    
    const teacher = await Teacher.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teacher);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error updating teacher" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const teacher = await Teacher.findByIdAndDelete(params.id);
    
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Teacher deleted successfully" }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error deleting teacher" },
      { status: 500 }
    );
  }
}
