import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./app/lib/jwt"

export async function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value
  const path = req.nextUrl.pathname

  /* ==============================
      IF USER VISITS LOGIN PAGE
  ============================== */

  if (path.startsWith("/login")) {

    if (!token) {
      return NextResponse.next()
    }

    try {

      const decoded: any = await verifyToken(token)

      if (decoded) {
        const role = decoded.role

        return NextResponse.redirect(
          new URL(`/${role}/dashboard`, req.url)
        )
      }

    } catch (error) {
      return NextResponse.next()
    }

  }

  /* ==============================
      PROTECT DASHBOARDS
  ============================== */

  if (
    path.startsWith("/admin") ||
    path.startsWith("/principal") ||
    path.startsWith("/teacher") ||
    path.startsWith("/student") ||
    path.startsWith("/parent")
  ) {

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    try {

      const decoded: any = await verifyToken(token)

      if (!decoded) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      const role = decoded.role

      /* ROLE CHECK */

      if (path.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/login/admin", req.url))
      }

      if (path.startsWith("/principal") && role !== "principal") {
        return NextResponse.redirect(new URL("/login/principal", req.url))
      }

      if (path.startsWith("/teacher") && role !== "teacher") {
        return NextResponse.redirect(new URL("/login/teacher", req.url))
      }

      if (path.startsWith("/student") && role !== "student") {
        return NextResponse.redirect(new URL("/login/student", req.url))
      }

      if (path.startsWith("/parent") && role !== "parent") {
        return NextResponse.redirect(new URL("/login/parent", req.url))
      }

    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

  }

  return NextResponse.next()
}


/* ==============================
   MATCHER
============================== */

export const config = {
  matcher: [
    "/login/:path*",
    "/admin/:path*",
    "/principal/:path*",
    "/teacher/:path*",
    "/student/:path*",
    "/parent/:path*",
  ],
}