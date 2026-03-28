import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Parent from "@/app/models/Parent";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const parent = await Parent.findById(params.id);
    
    if (!parent) {
      return NextResponse.json(
        { message: "Parent not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(parent);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching parent" },
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
    
    const parent = await Parent.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    
    if (!parent) {
      return NextResponse.json(
        { message: "Parent not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(parent);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error updating parent" },
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
    
    const parent = await Parent.findByIdAndDelete(params.id);
    
    if (!parent) {
      return NextResponse.json(
        { message: "Parent not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Parent deleted successfully" }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error deleting parent" },
      { status: 500 }
    );
  }
}
