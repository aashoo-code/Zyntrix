import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfiguration = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `<p>Hi! There, You have recently visited our website and entered your email, </br > Please use the following OTP to reset your password:</p>
           <h2>${otp}</h2>`,
  };

  transporter.sendMail(mailConfiguration, (error, info) => {
    if (error) {
      console.log("Error sending OTP email:", error);
    } else {
      console.log("OTP email sent successfully:", info.response);
    }
  });
};
