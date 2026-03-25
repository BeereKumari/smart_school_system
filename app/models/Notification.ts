import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userType: {
    type: String, // "admin" | "parent"
    required: true
  },
  message: {
    type: String,
    required: true
  },
  email: String,
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);