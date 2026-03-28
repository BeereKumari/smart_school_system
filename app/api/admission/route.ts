import { NextResponse } from "next/server"
import connectDB from "@/app/lib/mongodb"
import Admission from "@/app/models/Admission"
import Notification from "@/app/models/Notification" // ✅ added
import { sendEmail } from "../../lib/sendEmail" // ✅ added
import { adminTemplate } from "../../lib/emailTemplate" // ✅ added
import fs from "fs"
import path from "path"

export async function GET(){

 try{

  await connectDB()

  const admissions=await Admission.find()

  return NextResponse.json(admissions)

 }

 catch(error){

  console.log("ADMISSION FETCH ERROR:",error)

  return NextResponse.json(
   {message:"Failed to fetch admissions"},
   {status:500}
  )

 }

}

export async function POST(req:Request){

  await connectDB()

  const formData = await req.formData()

  const photo:any = formData.get("photo")

  let photoPath=""

  if(photo){

    const bytes = await photo.arrayBuffer()

    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(),"public","uploads")

    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir,{recursive:true})
    }

    const fileName = Date.now()+"-"+photo.name

    const uploadPath = path.join(uploadDir,fileName)

    fs.writeFileSync(uploadPath,buffer)

    photoPath="/uploads/"+fileName

  }

  const admission = await Admission.create({

    studentName:formData.get("studentName"),
    dob:formData.get("dob"),
    gender:formData.get("gender"),
    classApplying:formData.get("classApplying"),

    fatherName:formData.get("fatherName"),
    motherName:formData.get("motherName"),

    phone:formData.get("phone"),
    email:formData.get("email"),

    studentPhoto:photoPath,

    status:"pending"

  })

  // ✅ 🔔 ADMIN NOTIFICATION (ADDED)
  await Notification.create({
    userType: "admin",
    message: `New admission request from ${admission.studentName}`,
    type: "admission",
    admissionId: admission._id
  })

  console.log("✅ Admin notification created:", admission.studentName)

  // ✅ 📧 ADMIN EMAIL (ADDED)
  await sendEmail(
    process.env.ADMIN_EMAIL!,
    "New Admission Request",
    adminTemplate(admission.studentName)
  )

  console.log("✅ Admin email sent:", admission.studentName)

  // ✅ RESPONSE (unchanged)
  return NextResponse.json(admission)

}