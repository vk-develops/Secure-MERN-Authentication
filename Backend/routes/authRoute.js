import express from "express";
import { registerUser } from "../controllers/authController.js";

// router init
const router = express.Router();

// HTTP Methods
router.post("/register", registerUser);

// Export
export default router;
