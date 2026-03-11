import { NextResponse } from "next/server";

import connectDB from "../../../../lib/mongodb";

import Admission from "../../../../models/Admission";
import Student from "../../../../models/Student";
import Parent from "../../../../models/Parent";

import { generateStudentId } from "../../../../lib/generateStudentId";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    // Next.js 15 fix
    const { id } = await context.params;

    const admission = await Admission.findById(id);

    if (!admission) {
      return NextResponse.json({ message: "Admission not found" });
    }

    // generate student ID
    const count = await Student.countDocuments();

    const studentId = generateStudentId(count);

    // create parent
    // check if parent already exists
    let parent = await Parent.findOne({ email: admission.email });

    if (!parent) {

    parent = await Parent.create({
    name: admission.fatherName,
    email: admission.email,
    phone: admission.phone,
    studentId
  });

}

    // create student
    await Student.create({
      studentId,
      name: admission.studentName,
      class: admission.classApplying,
      dob: admission.dob,
      gender: admission.gender,
      parentId: parent._id
    });

    // update admission status
    admission.status = "approved";
    await admission.save();

    return NextResponse.json({
      message: "Admission approved successfully",
      studentId
    });

  } catch (error) {

    console.error("APPROVE ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }
}