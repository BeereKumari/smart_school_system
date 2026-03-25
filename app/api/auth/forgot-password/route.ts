import { NextResponse } from "next/server"

import connectDB from "@/app/lib/mongodb"

import Admin from "@/app/models/Admin"
import Teacher from "@/app/models/Teacher"
import Principal from "@/app/models/Principal"

import Otp from "@/app/models/Otp"

import { generateOTP } from "@/app/lib/otp"
import { sendOTP } from "@/app/lib/sendEmail"


export async function POST(req: Request){

 try{

  await connectDB()

  const body = await req.json()

  const email = body.email.toLowerCase().trim()

  console.log("FORGOT REQUEST:", email)


  let user = null
  let role = ""


  // check admin
  user = await Admin.findOne({ email })

  if(user){
   role = "admin"
  }


  // check teacher
  if(!user){

   user = await Teacher.findOne({ email })

   if(user){
    role = "teacher"
   }

  }


  // check principal
  if(!user){

   user = await Principal.findOne({ email })

   if(user){
    role = "principal"
   }

  }


  if(!user){

   return NextResponse.json({
    success:false,
    message:"Email not registered"
   })

  }


  const otp = generateOTP()

  const expires = new Date(Date.now() + 10*60*1000)


  await Otp.deleteMany({ email })


  await Otp.create({
   email,
   otp,
   expiresAt: expires
  })


  await sendOTP(email, otp)


  return NextResponse.json({

   success:true,
   role: role,
   message:"OTP sent to your email"

  })


 }

 catch(error){

  console.log("FORGOT PASSWORD ERROR:", error)

  return NextResponse.json({
   success:false,
   message:"Server error"
  })

 }

}