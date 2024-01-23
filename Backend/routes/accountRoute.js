import express from "express";
import { resendOTP, verifyAccount } from "../controllers/accountController.js";
import { protect } from "../middlewares/authMiddleware.js";

// router init
const router = express.Router();

// HTTP Methods
router.post("/verify", protect, verifyAccount);
router.get("/resend-otp", protect, resendOTP);

//HTTP Methods for password reset
router.post("/reset-password");

export default router;
