import express from "express";
import {
    generateResetPasswordLink,
    resendOTP,
    resetPassword,
    verifyAccount,
} from "../controllers/accountController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { verifyResetPasswordLink } from "../middlewares/accountMiddleware.js";

// router init
const router = express.Router();

// HTTP Methods
router.post("/verify", protect, verifyAccount);
router.get("/resend-otp", protect, resendOTP);

//HTTP Methods for password reset
router.post("/reset-password", generateResetPasswordLink);
router.post("/verify-link", verifyResetPasswordLink, resetPassword);

export default router;
