import express from "express";
import {
    resendOTP,
    verifyAccount,
} from "../controllers/accountVerifyController.js";
import { protect } from "../middlewares/authMiddleware.js";

// router init
const router = express.Router();

// HTTP Methods
router.post("/verify", protect, verifyAccount);
router.get("/resend-otp", protect, resendOTP);

export default router;
