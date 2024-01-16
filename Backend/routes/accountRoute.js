import express from "express";
import { verifyAccount } from "../controllers/accountVerifyController.js";

// router init
const router = express.Router();

// HTTP Methods
router.post("/verify", verifyAccount);

export default router;
