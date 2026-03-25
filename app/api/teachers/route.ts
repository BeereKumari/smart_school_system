import {NextResponse} from "next/server"
import connectDB from "@/app/lib/mongodb"
import Teacher from "@/app/models/Teacher"

export async function GET(){

  await connectDB()

  const teachers = await Teacher.find()

  return NextResponse.json(teachers)

}

export async function POST(req:Request){

  await connectDB()

  const body = await req.json()

  const teacher = await Teacher.create(body)

  return NextResponse.json(teacher)

}