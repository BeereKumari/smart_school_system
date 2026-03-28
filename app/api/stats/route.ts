import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Student from "@/app/models/Student";
import Teacher from "@/app/models/Teacher";
import Parent from "@/app/models/Parent";
import Admission from "@/app/models/Admission";

export async function GET() {
  try {
    await connectDB();

    const [students, teachers, parents, admissions] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Parent.countDocuments(),
      Admission.countDocuments({ status: "pending" })
    ]);

    const uniqueClasses = await Student.distinct("classApplying");
    const totalClasses = uniqueClasses.length || 30;

    return NextResponse.json({
      students,
      teachers,
      parents,
      classes: totalClasses,
      pendingAdmissions: admissions
    });

  } catch (error) {
    console.error("STATS API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch stats", error: String(error) },
      { status: 500 }
    );
  }
}
