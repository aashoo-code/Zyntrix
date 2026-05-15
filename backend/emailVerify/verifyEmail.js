import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP SERVER READY");
  }
});

export const verifyEmail = async (email, token) => {
  try {
    const mailConfiguration = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `
        <p>Please click the link below to verify your email:</p>
        <a href="https://zyntrix-frontend.onrender.com/verify/${token}">
          Verify Email
        </a>
      `,
    };

    const info = await transporter.sendMail(mailConfiguration);

    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
