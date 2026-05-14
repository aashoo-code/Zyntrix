import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const verifyEmail = (email, token) => {
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
    subject: "Email Verification",
    html: `<p>Hi! There, You have recently visited our website and entered your email, </br > Please click the following link to verify your email:</p>
           <a href="https://zyntrix-frontend.onrender.com/verify/${token}">Verify Email</a>`,
  };

  transporter.sendMail(mailConfiguration, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};
