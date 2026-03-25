import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Admission from "../../../models/Admission";
import Student from "../../../models/Student";
import fs from "fs";
import path from "path";
import { generateStudentId } from "../../../lib/generateStudentId";
import Notification from "@/app/models/Notification";
import { sendEmail } from "@/app/lib/sendEmail";
import { adminTemplate } from "../../../lib/emailTemplate";


export async function POST(req: Request) {

  try {

    await connectDB();

    const formData = await req.formData();

    const file = formData.get("studentPhoto") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Photo required" },
        { status: 400 }
      );
    }

    /* ✅ SAVE IMAGE */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + file.name;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    fs.writeFileSync(filePath, buffer);

    const photoPath = `/uploads/${fileName}`;

    /* ✅ GET FORM DATA */
    const data = {
      studentName: formData.get("studentName")?.toString() || "",
      dob: formData.get("dob")?.toString() || "",
      gender: formData.get("gender")?.toString() || "",
      classApplying: formData.get("classApplying")?.toString() || "",
      fatherName: formData.get("fatherName")?.toString() || "",
      motherName: formData.get("motherName")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      studentPhoto: photoPath
    };



    /* ✅ SAVE TO STUDENTS COLLECTION */
    let newStudent;
    let studentId;

while (true) {

  studentId = await generateStudentId();

  try {

    newStudent = await Student.create({
    studentId,
    ...data,
    source: "admin",
    status: "active"
  });
    break; // ✅ success → exit loop

  } catch (err: any) {

    // ❌ If duplicate ID → retry
    if (err.code === 11000) {
      console.log("Duplicate ID, retrying...");
      continue;
    }

    throw err; // other errors
  }
}

    /* ✅ SAVE TO ADMISSIONS COLLECTION */
    await Admission.create({
      ...data,
      studentId,
      status: "approved",
      source: "admin"
    });
    // 🔔 In-app notification for admin
await Notification.create({
  userType: "admin",
  message: `New admission request from ${data.studentName}`
});
console.log("✅ Admin notification created:", data.studentName);

// 📧 Email to admin
await sendEmail(
  process.env.ADMIN_EMAIL!,
  "New Admission Request",
  adminTemplate(data.studentName)
);

    return NextResponse.json({
      message: "Student added successfully",
      student: newStudent
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json({
      message: "Server error",
      error: error.message
    }, { status: 500 });

  }

}

