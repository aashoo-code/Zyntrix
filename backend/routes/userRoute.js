import express from "express";
import { forgotPassword, login, logout, register, reverify, verify, resetPassword, verifyOtp, allUsers, getUserByid, updateUser } from "../controller/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/reverify", reverify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOtp);
router.post("/reset-password/:email", resetPassword);
router.get("/all-users", isAuthenticated, isAdmin, allUsers);
router.get("/get-user/:id", getUserByid); 
router.put('/update/:id', isAuthenticated, singleUpload, updateUser)

export default router;