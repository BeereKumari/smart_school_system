import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/jwt";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const token = cookieHeader.split(";").find(c => c.trim().startsWith("token="))?.split("=")[1];
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const payload = await verifyToken(token);
  
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  
  return NextResponse.json({
    user: {
      id: payload.id,
      role: payload.role
    }
  });
}
