import { NextResponse } from "next/server"

export async function POST() {

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully"
  }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    }
  })

  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    path: "/",
    expires: new Date(0)
  })

  return response
}
