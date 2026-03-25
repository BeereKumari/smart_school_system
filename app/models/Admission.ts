import mongoose, { Schema, models, model } from "mongoose";

const AdmissionSchema = new Schema(
{
  studentName: { type: String, required: true },

  dob: { type: String, required: true },

  gender: { type: String, required: true },

  classApplying: { type: String, required: true },

  fatherName: { type: String, required: true },

  motherName: { type: String, required: true },

  phone: { type: String, required: true },

  email: { type: String, required: true },

  // ✅ ADD THIS FIELD
  studentPhoto: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "pending"
  }

},
{ timestamps: true }
);

const Admission =
  models.Admission || model("Admission", AdmissionSchema);

export default Admission;