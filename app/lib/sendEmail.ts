import nodemailer from "nodemailer";
import { generateEmailTemplate } from "./emailTemplate";

// ✅ COMMON EMAIL FUNCTION (MAIN)
export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Smart School System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("Email sent to:", to);

  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
}


// ✅ OTP FUNCTION (REUSE ABOVE)
export async function sendOTP(email: string, otp: string) {
  const html = generateEmailTemplate(otp);

  await sendEmail(
    email,
    "Smart School Password Reset OTP",
    html
  );
}