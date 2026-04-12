import { NextResponse } from "next/server"

const mockAnnouncements = [
  {
    _id: "1",
    title: "Annual Sports Day",
    message: "Annual Sports Day will be held on April 20th, 2026. All students are encouraged to participate.",
    priority: "high",
    createdAt: "2026-04-10",
    createdBy: "Principal",
    expiresAt: "2026-04-20"
  },
  {
    _id: "2",
    title: "Parent-Teacher Meeting",
    message: "PTM scheduled for April 25th, 2026. Parents are requested to attend.",
    priority: "medium",
    createdAt: "2026-04-08",
    createdBy: "Admin"
  },
  {
    _id: "3",
    title: "Holiday Notice",
    message: "School will remain closed on April 15th due to local elections.",
    priority: "low",
    createdAt: "2026-04-05",
    createdBy: "Admin",
    expiresAt: "2026-04-15"
  }
]

export async function GET() {
  return NextResponse.json(mockAnnouncements)
}
