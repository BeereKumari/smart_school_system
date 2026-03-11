import { NextResponse } from "next/server"
import connectDB from "@/app/lib/mongodb"
import Admission from "@/app/models/Admission"

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

 try{

  await connectDB()

  const body=await req.json()

  const admission=await Admission.create({
   studentName:body.studentName,
   dob:body.dob,
   gender:body.gender,
   classApplying:body.classApplying,
   fatherName:body.fatherName,
   motherName:body.motherName,
   phone:body.phone,
   email:body.email,
   status:"pending"
  })

  return NextResponse.json({
   message:"Admission submitted",
   admission
  })

 }

 catch(error){

  console.log("ADMISSION ERROR:",error)

  return NextResponse.json(
   {message:"Server Error"},
   {status:500}
  )

 }

}