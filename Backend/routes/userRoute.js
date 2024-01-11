import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getUserProfile, isLoggedIn } from "../controllers/userController.js";

// router init
const router = express.Router();

// HTTP Methods
router.get("/profile", protect, getUserProfile);
router.get("/isloggedin", protect, isLoggedIn);

//export
export default router;
