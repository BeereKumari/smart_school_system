import mongoose, { Schema, models, model } from "mongoose";

const StudentSchema = new Schema({
  studentId: String,
  name: String,
  class: String,
  dob: String,
  gender: String,

  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent"
  }
});

const Student = models.Student || model("Student", StudentSchema);

export default Student;