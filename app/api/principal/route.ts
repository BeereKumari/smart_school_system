import {NextResponse} from "next/server"
import connectDB from "@/app/lib/mongodb"
import Principal from "@/app/models/Principal"

export async function GET(){

 await connectDB()

 const principal = await Principal.find()

 return NextResponse.json(principal)

}

export async function POST(req:Request){

 await connectDB()

 const body = await req.json()

 const existing = await Principal.findOne()

 if(existing){
  return NextResponse.json(
   {message:"Principal already exists"},
   {status:400}
  )
 }

 const principal = await Principal.create(body)

 return NextResponse.json(principal)

}