import { NextResponse } from "next/server"

const mockAttendance = [
  { _id: "1", studentId: "STU001", studentName: "Aarav Sharma", class: "10-A", date: "2026-04-12", status: "present" },
  { _id: "2", studentId: "STU002", studentName: "Priya Patel", class: "10-A", date: "2026-04-12", status: "present" },
  { _id: "3", studentId: "STU003", studentName: "Rahul Kumar", class: "9-B", date: "2026-04-12", status: "late" },
  { _id: "4", studentId: "STU004", studentName: "Sneha Reddy", class: "10-A", date: "2026-04-12", status: "absent" },
  { _id: "5", studentId: "STU005", studentName: "Vikram Singh", class: "11-C", date: "2026-04-11", status: "present" },
  { _id: "6", studentId: "STU006", studentName: "Ananya Gupta", class: "9-B", date: "2026-04-11", status: "present" },
]

export async function GET() {
  return NextResponse.json(mockAttendance)
}
