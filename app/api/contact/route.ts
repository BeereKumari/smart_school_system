import { NextResponse } from "next/server"
import { connectDB } from "../../lib/mongodb"
import Contact from "../../models/Contact"

export async function POST(req: Request){

try{

await connectDB()

const body = await req.json()

const message = new Contact(body)

await message.save()

return NextResponse.json({
success:true,
message:"Message stored successfully"
})

}

catch(error){

console.log("Contact API Error:",error)

return NextResponse.json({
success:false,
message:"Server error"
})

}

}