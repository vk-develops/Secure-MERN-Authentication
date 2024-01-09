import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

// router init
const router = express.Router();

// HTTP Methods
router.post("/register", registerUser);
router.post("/login", loginUser);

// Export
export default router;
