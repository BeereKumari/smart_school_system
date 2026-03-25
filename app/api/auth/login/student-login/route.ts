import {NextResponse} from "next/server"
import connectDB from "@/app/lib/mongodb"
import Student from "@/app/models/Student"

export async function POST(req:Request){

 await connectDB()

 const {studentId,dob} = await req.json()

 const student = await Student.findOne({
  studentId,
  dob
 })

 if(!student){
  return NextResponse.json(
   {message:"Invalid Student ID or DOB"},
   {status:401}
  )
 }

 return NextResponse.json({
  message:"Login success",
  student
 })

}