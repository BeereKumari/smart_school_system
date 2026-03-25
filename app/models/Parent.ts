import mongoose, { Schema, models, model } from "mongoose";

const ParentSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  studentId: String
});

const Parent = models.Parent || model("Parent", ParentSchema);

export default Parent;