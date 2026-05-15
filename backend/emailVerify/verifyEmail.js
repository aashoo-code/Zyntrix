// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const verifyEmail = (email, token) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });

//   const mailConfiguration = {
//     from: process.env.MAIL_USER,
//     to: email,
//     subject: "Email Verification",
//     html: `<p>Hi! There, You have recently visited our website and entered your email, </br > Please click the following link to verify your email:</p>
//            <a href="https://zyntrix-frontend.onrender.com//verify/${token}">Verify Email</a>`,
//   };

//   transporter.sendMail(mailConfiguration, (error, info) => {
//     if (error) {
//       console.log("Error sending email:", error);
//     } else {
//       console.log("Email sent successfully:", info.response);
//     }
//   });
// };


import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyEmail = async (email, token) => {
  try {

    console.log("RESEND START");

    const response = await resend.emails.send({
      from: "Zyntrix <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Email",
     html: `
  <div style="
    margin:0;
    padding:40px 20px;
    background: linear-gradient(to bottom right, #020617, #0f172a, #1e293b);
    font-family: Arial, sans-serif;
    color: white;
    min-height: 100vh;
  ">

    <div style="
      max-width: 500px;
      margin: auto;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(34, 211, 238, 0.3);
      border-radius: 20px;
      padding: 40px 30px;
      text-align: center;
      box-shadow: 0 0 30px rgba(34, 211, 238, 0.15);
    ">

      <h1 style="
        color: #22d3ee;
        margin-bottom: 20px;
        font-size: 28px;
      ">
        Verify Your Email
      </h1>

      <p style="
        color: #cbd5e1;
        font-size: 16px;
        line-height: 1.7;
        margin-bottom: 30px;
      ">
        Welcome to Zyntrix ✨ <br/><br/>
Hi! There, You have recently visited our website and entered your email, </br > Please verify your email address to Activate your Account.
      </p>

      <a
        href="${process.env.CLIENT_URL}/verify/${token}"
        style="
          display: inline-block;
          padding: 14px 28px;
          background: linear-gradient(to right, #06b6d4, #3b82f6);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: bold;
          font-size: 16px;
        "
      >
        Verify Email
      </a>

      <p style="
        margin-top: 30px;
        color: #64748b;
        font-size: 13px;
      ">
        If you didn’t create this account, you can safely ignore this email.
      </p>

    </div>
  </div>
`,
    });

    console.log("EMAIL SENT =>", response);

    return response;

  } catch (error) {

    console.error("RESEND ERROR =>", error);

    throw error;
  }
};
