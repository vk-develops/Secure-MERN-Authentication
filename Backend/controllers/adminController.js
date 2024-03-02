import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Get all lists of the user
// @route   POST/api/v1/admin/get-users
// @access  Private
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

// @desc    Delete selected user
// @route   POST/api/v1/admin/delete-user
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;

        //Check for a valid user
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted sucessfully",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { getAllUsers, deleteUser };
