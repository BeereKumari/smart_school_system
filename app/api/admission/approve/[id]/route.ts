import { NextResponse } from "next/server";

import connectDB from "../../../../lib/mongodb";

import Admission from "../../../../models/Admission";
import Student from "../../../../models/Student";
import Parent from "../../../../models/Parent";
import Notification from "../../../../models/Notification";
import { sendEmail } from "@/app/lib/sendEmail";
import { approvalTemplate } from "../../../../lib/emailTemplate";

import { generateStudentId } from "../../../../lib/generateStudentId";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {

    await connectDB();

    // ✅ Next.js 15 params fix
    const { id } = await context.params;

    const admission = await Admission.findById(id);

    if (!admission) {
      return NextResponse.json({ message: "Admission not found" });
    }

    if (admission.status === "approved") {
      // 🔔 In-app notification for parent
      await Notification.create({
      userType: "parent",
      message: `${admission.studentName}'s admission approved`,
      email: admission.email
    });

    // 📧 Email to parent
    await sendEmail(
        admission.email,
        "Admission Approved",
        approvalTemplate(admission.studentName)
    );
      return NextResponse.json({ message: "Already approved" });
    }

    // ✅ generate studentId (NO count needed)
    const studentId = await generateStudentId();

    // ✅ find or create parent
    let parent = await Parent.findOne({ email: admission.email });

    if (!parent) {
      parent = await Parent.create({
        name: admission.fatherName,
        email: admission.email,
        phone: admission.phone,
        studentId: studentId // ✅ FIXED
      });
    }

    // ✅ create student (MATCH YOUR SCHEMA)
    await Student.create({
      studentId,
      studentName: admission.studentName,
      dob: admission.dob,
      gender: admission.gender,
      classApplying: admission.classApplying,
      fatherName: admission.fatherName,
      motherName: admission.motherName,
      phone: admission.phone,
      email: admission.email,
      studentPhoto: admission.studentPhoto,
      parentId: parent._id,
      source: "admission",
      status: "active"
    });

    // ✅ update admission
    admission.status = "approved";
    await admission.save();

    return NextResponse.json({
      message: "Admission approved successfully",
      studentId
    });

  } catch (error: any) {

    console.error("APPROVE ERROR:", error);

    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );

  }
}