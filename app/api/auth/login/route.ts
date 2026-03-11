import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";

import Admin from "@/app/models/Admin";
import Teacher from "@/app/models/Teacher";
import Principal from "@/app/models/Principal";
import Student from "@/app/models/Student";
import Parent from "@/app/models/Parent";

import {generateToken} from "@/app/lib/jwt"
export async function POST(req: Request) {

  try {

    await connectDB();

    const body = await req.json();

    const { email, password, role, studentId, dob, phone } = body;

    console.log("Login request:", body);

    let user = null;

    /* ADMIN LOGIN */
    if (role === "admin") {

  const user = await Admin.findOne({ email, password });


  if (user) {
    return NextResponse.json({
      success: true,
      redirect: "/admin/dashboard"
    });
  }

}

    /* TEACHER LOGIN */
    if (role === "teacher") {
      user = await Teacher.findOne({ email, password });

      if (user) {
        return NextResponse.json({
          success: true,
          redirect: "/teacher/dashboard"
        });
      }
    }

    /* PRINCIPAL LOGIN */
    if (role === "principal") {
      user = await Principal.findOne({ email, password });

      if (user) {
        return NextResponse.json({
          success: true,
          redirect: "/principal/dashboard"
        });
      }
    }

    /* STUDENT LOGIN */
    if (role === "student") {
      user = await Student.findOne({ studentId, dob });

      if (user) {
        return NextResponse.json({
          success: true,
          redirect: "/student/dashboard"
        });
      }
    }

    /* PARENT LOGIN */
    if (role === "parent") {
      user = await Parent.findOne({ studentId, phone });

      if (user) {
        return NextResponse.json({
          success: true,
          redirect: "/parent/dashboard"
        });
      }
    }

  if(!user){

   return NextResponse.json(
    {success:false,message:"Invalid credentials"},
    {status:401}
   )

  }

  const token = generateToken(user)

  const response = NextResponse.json({
   success:true,
   redirect:`/${role}/dashboard`
  })

  response.cookies.set({
   name: "token",
   value: token,
   httpOnly: true,
   path: "/",
   sameSite: "lax",
   maxAge: 60 * 60 * 24
  })

  return response

 }
  
  catch (error) {

    console.log("LOGIN ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }
}