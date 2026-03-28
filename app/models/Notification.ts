import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "info"
  },
  admissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admission",
    default: null
  },
  email: String,
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
