import User from "../models/userModel.js";
import { Session } from "../models/sessionModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { sendOtpEmail } from "../emailVerify/sendOtpMail.js";
import cloudinary from "../utils/Cloudinary.js";

// export const register = async (req, res) => {
//   try {
//     console.log("REGISTER START");

//     const { lastName, firstName, email, password, confirmPassword } = req.body;

//     console.log("REQ BODY =>", req.body);

//     if (!firstName || !lastName || !email || !password || !confirmPassword) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     if (password !== confirmPassword) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Passwords do not match" });
//     }

//     console.log("CHECKING USER");

//     const user = await User.findOne({ email });

//     if (user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User already exists" });
//     }

//     console.log("HASHING PASSWORD");

//     const hashedPassword = await bcrypt.hash(password, 10);

//     console.log("CREATING USER");

//     const newUser = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       confirmPassword: hashedPassword,
//     });

//     console.log("USER CREATED =>", newUser.email);

//     const token = jwt.sign(
//       { id: newUser._id },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "2d",
//       }
//     );

//     console.log("TOKEN GENERATED =>", token);

//     console.log("CALLING VERIFY EMAIL");

//     await verifyEmail(email, token);

//     console.log("VERIFY EMAIL FINISHED");

//     newUser.token = token;

//     await newUser.save();

//     console.log("USER SAVED");

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: newUser,
//     });

//   } catch (error) {
//     console.error("REGISTER ERROR =>", error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };
export const register = async (req, res) => {
  try {
    console.log("REGISTER START");

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = req.body;

    console.log("REQ BODY =>", req.body);

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    console.log("CHECKING USER");

    // Existing user check
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    console.log("HASHING PASSWORD");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("CREATING USER");

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log("USER CREATED =>", newUser.email);

    // Generate token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    console.log("TOKEN GENERATED =>", token);

    // Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });

  } catch (error) {
    console.error("REGISTER ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.token = null;
    user.isVerified = true;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const reverify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    verifyEmail(email, token);
    user.token = token;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Verification email resent successfully",
      token,
    });
  } catch (error) {
    console.error("Error resending verification email:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!existinguser.isVerified) {
      return res
        .status(401)
        .json({ success: false, message: "Email not verified" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existinguser.password,
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    // Generate JWT token
    const accessToken = jwt.sign(
      { id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
    );
    const refreshToken = jwt.sign(
      { id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    // existinguser.token = accessToken;
    existinguser.isLoggedIn = true;
    await existinguser.save();

    // Check for existing sessions and delete them
    const existingUserSessions = await Session.findOne({
      userId: existinguser._id,
    });
    if (existingUserSessions) {
      await Session.deleteOne({ userId: existinguser._id });
    }

    // Create a new session for the user
    await Session.create({ userId: existinguser._id });
    res.status(200).json({
      success: true,
      message: `Welcome back, ${existinguser.firstName}!`,
      user: existinguser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.id;
    await Session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { token: null, isLoggedIn: false });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await sendOtpEmail(email, otp);
    return res
      .status(200)
      .json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.params.email;
    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.otp || !user.otpExpiry) {
      return res
        .status(400)
        .json({ success: false, message: "OTP not generated" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (new Date() > user.otpExpiry) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const email = req.params.email;

    if (!newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "New password is required" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getUserByid = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      "-password -otp -otpExpiry -token",
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.id; // The id of user that we want to update
    const loggedInUser = req.user; // from is Authenticated middleware
    const { firstName, lastName, address, city, state, pincode, phone, role } =
      req.body;

    if (
      loggedInUser._id.toString() !== userIdToUpdate &&
      loggedInUser.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not Allowed to update this profile",
      });
    }
    let user = await User.findById(userIdToUpdate);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    let profilePicUrl = user.profilePicture;
    let profilePictureID = user.profilePictureID;

    // if a new file uploaded
    if (req.file) {
      if (profilePictureID) {
        await cloudinary.uploader.destroy(profilePictureID);
      }
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });
      ((profilePicUrl = uploadResult.secure_url),
        (profilePictureID = uploadResult.public_id));
    }
    // update Fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = state || user.state;
    user.pincode = pincode || user.pincode;
    user.role = role;
    user.phone = phone;
    user.profilePicture = profilePicUrl;
    user.profilePictureID = profilePictureID;

    const updatedUser = await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
