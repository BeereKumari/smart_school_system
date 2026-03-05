import { NextResponse } from "next/server"
import { connectDB } from "../../lib/mongodb"
import Admission from "../../models/Admission"

export async function POST(req: Request){

  await connectDB()

  const body = await req.json()

  const admission = new Admission(body)

  await admission.save()

  return NextResponse.json({
    message:"Application Submitted"
  })

}