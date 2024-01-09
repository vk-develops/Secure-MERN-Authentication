import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Register users & and get a token
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { registerUser };
