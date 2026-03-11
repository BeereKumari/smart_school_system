import mongoose, { Schema, models, model } from "mongoose";

const TeacherSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  phone: String,

  subject: String,

  role: {
    type: String,
    default: "teacher"
  }

},
{ timestamps: true }
);

const Teacher = models.Teacher || model("Teacher", TeacherSchema);

export default Teacher;