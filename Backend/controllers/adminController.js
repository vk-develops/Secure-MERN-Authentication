import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({ role: "User" });
        const usersCount = await User.countDocuments({ role: "User" });

        res.status(200).json({
            success: true,
            count: usersCount,
            data: users,
            message: "User retrieval success",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { getAllUsers };
