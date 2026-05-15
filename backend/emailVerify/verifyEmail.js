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

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyEmail = async (email, token) => {
  try {

    console.log("RESEND START");

    const response = await resend.emails.send({
      from: "Zyntrix <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Email",
      html: `<p>Hi! There, You have recently visited our website and entered your email, </br > Please click the following link to verify your email:</p>
//            <a href="https://zyntrix-frontend.onrender.com//verify/${token}">Verify Email</a>`,
    });

    console.log("EMAIL SENT =>", response);

    return response;

  } catch (error) {

    console.error("RESEND ERROR =>", error);

    throw error;
  }
};
