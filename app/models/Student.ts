import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({

  studentId: {
    type: String,
    required: true,
    unique: true
  },

  studentName: String,
  dob: String,
  gender: String,
  classApplying: String,
  fatherName: String,
  motherName: String,
  phone: String,
  email: String,
  studentPhoto: String,

  source: String,

  status: {
    type: String,
    default: "active"
  }

}, { timestamps: true });

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);