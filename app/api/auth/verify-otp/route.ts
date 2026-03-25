import { NextResponse } from "next/server"
import connectDB from "@/app/lib/mongodb"
import Otp from "@/app/models/Otp"

export async function POST(req:Request){

 await connectDB()

 const {email,otp} = await req.json()

 const record = await Otp.findOne({email,otp})

 if(!record){

  return NextResponse.json({
   success:false
  })

 }

 return NextResponse.json({
  success:true
 })

}