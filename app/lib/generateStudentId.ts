import Student from "../models/Student";

export async function generateStudentId() {

  const year = new Date().getFullYear();

  const count = await Student.countDocuments();

  const nextNumber = count + 1;

  const formatted = String(nextNumber).padStart(3, "0");

  return `SSS-${year}-${formatted}`;
}