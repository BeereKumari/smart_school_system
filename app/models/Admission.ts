import mongoose, { Schema, models, model } from "mongoose";

const AdmissionSchema = new Schema(
{
  studentName: String,
  dob: String,
  gender: String,
  classApplying: String,

  fatherName: String,
  motherName: String,

  phone: String,
  email: String,

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