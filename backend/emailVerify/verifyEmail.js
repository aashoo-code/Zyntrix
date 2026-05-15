import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.log("SMTP ERROR:", error);
//   } else {
//     console.log("SMTP SERVER READY");
//   }
// });

export const verifyEmail = async (email, token) => {
  try {
    const {name, email, message} = req.body;
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {  user: process.env.MAIL_USER,
               pass: process.env.MAIL_PASS,
  },
secure: true,
    });

    
    const mailConfiguration = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",
      text: message,
      html: `
        <p>Please click the link below to verify your email:</p>
        <a href="https://zyntrix-frontend.onrender.com/verify/${token}">
          Verify Email
        </a>
      `,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if(err) {
          console.error(err);
          reject(err)
        } else{
          resolve(info);
        }
      });
    });
    res.status(200).json({ message: "Email Sent"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
