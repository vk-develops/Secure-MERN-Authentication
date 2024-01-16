import express from "express";
import { verifyAccount } from "../controllers/accountVerifyController.js";
import { protect } from "../middlewares/authMiddleware.js";

// router init
const router = express.Router();

// HTTP Methods
router.post("/verify", protect, verifyAccount);

export default router;
