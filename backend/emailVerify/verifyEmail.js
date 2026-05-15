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
export const verifyEmail = async (email, token) => {
  try {
console.log("STEP 1");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY ERROR =>", error);
  } else {
    console.log("SMTP READY =>", success);
  }
});
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
console.log("STEP 2");
    const info = await transporter.sendMail(mailConfiguration);
console.log("STEP 3");
    console.log("Email sent:", info.response);

  } catch (error) {
    console.log("Error sending email:", error);
  }
};
