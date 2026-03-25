import { NextResponse } from "next/server"
import connectDB from "@/app/lib/mongodb"

import Admin from "@/app/models/Admin"
import Teacher from "@/app/models/Teacher"
import Principal from "@/app/models/Principal"

import bcrypt from "bcryptjs"

export async function POST(req:Request){

 await connectDB()

 const {email,newPassword} = await req.json()

 const hashed = await bcrypt.hash(newPassword,10)

 let user = await Admin.findOne({email})

 if(user){

  await Admin.updateOne(
   {email},
   {password:hashed}
  )

  return NextResponse.json({success:true})
 }

 user = await Teacher.findOne({email})

 if(user){

  await Teacher.updateOne(
   {email},
   {password:hashed}
  )

  return NextResponse.json({success:true})
 }

 user = await Principal.findOne({email})

 if(user){

  await Principal.updateOne(
   {email},
   {password:hashed}
  )

  return NextResponse.json({success:true})
 }

 return NextResponse.json({
  success:false,
  message:"User not found"
 })

}