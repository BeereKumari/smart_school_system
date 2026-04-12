import mongoose, { Schema, models, model } from "mongoose";

const ClassAssignmentSchema = new Schema({
  className: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  }
}, { _id: false });

const TeacherSchema = new Schema({

  teacherId: {
    type: String,
    unique: true
  },

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

  phone: {
    type: String,
  },

  alternatePhone: {
    type: String,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },

  dateOfBirth: {
    type: Date,
  },

  qualification: {
    type: String,
  },

  specialization: {
    type: String,
  },

  experience: {
    type: Number,
    default: 0
  },

  department: {
    type: String,
  },

  designation: {
    type: String,
    default: "Teacher"
  },

  joiningDate: {
    type: Date,
  },

  address: {
    type: String,
  },

  city: {
    type: String,
  },

  state: {
    type: String,
  },

  pincode: {
    type: String,
  },

  aadharCard: {
    type: String,
  },

  panCard: {
    type: String,
  },

  assignedClasses: [ClassAssignmentSchema],

  photo: String,

  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },

  salary: {
    type: Number,
  },

  bankAccount: {
    accountNumber: String,
    bankName: String,
    ifscCode: String,
    accountHolderName: String
  },

  isActive: {
    type: Boolean,
    default: true
  },

  role: {
    type: String,
    default: "teacher"
  },

  sendCredentials: {
    type: Boolean,
    default: true
  },

  notes: {
    type: String,
  }

},
{ timestamps: true }
);

const Teacher = models.Teacher || model("Teacher", TeacherSchema);

export default Teacher;