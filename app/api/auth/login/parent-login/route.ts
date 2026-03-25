import {NextResponse} from "next/server"
import connectDB from "@/app/lib/mongodb"
import Parent from "@/app/models/Parent"

export async function POST(req:Request){

 await connectDB()

 const {studentId,phone} = await req.json()

 const parent = await Parent.findOne({
  studentId,
  phone
 })

 if(!parent){
  return NextResponse.json(
   {message:"Invalid credentials"},
   {status:401}
  )
 }

 return NextResponse.json({
  message:"Login success",
  parent
 })

}