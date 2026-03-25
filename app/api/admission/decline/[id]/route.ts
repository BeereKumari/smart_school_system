import { NextResponse } from "next/server"
import connectDB from "../../../../lib/mongodb"
import Admission from "../../../../models/Admission"
import Notification from "@/app/models/Notification";
import { sendEmail } from "@/app/lib/sendEmail";
import { declineTemplate } from "../../../../lib/emailTemplate";

import mongoose from "mongoose"



export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {

    await connectDB();

    // IMPORTANT: await params
    const { id } = await context.params;

    console.log("Decline API ID:", id);

    const admission = await Admission.findById(id);

    if (!admission) {
      console.log("Admission NOT found");
      return NextResponse.json({ message: "Admission not found" });
    }

    admission.status = "declined";
    await admission.save();
    await Notification.create({
  userType: "parent",
  message: `${admission.studentName}'s admission declined`,
  email: admission.email
});

await sendEmail(
  admission.email,
  "Admission Declined",
  declineTemplate(admission.studentName)
);

    console.log("Admission updated:", admission);

    return NextResponse.json({
      message: "Admission declined successfully",
      admission
    });

  } catch (error) {

    console.error("Decline API error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }
}