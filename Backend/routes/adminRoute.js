import express from "express";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/adminController.js";

// router init
const router = express.Router();

//HTTP Methods
// router.get("/get-user");
router.get("/get-users", protect, isAdmin, getAllUsers);

//Export
export default router;
