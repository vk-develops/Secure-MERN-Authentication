import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    To check whether user is logged in or not
// @route   GET /api/v1/users/isloggedin
// @access  Private
const isLoggedIn = asyncHandler(async (req, res) => {
    try {
        //Getting the id from the protect route
        const id = req.user._id;

        //Find the user
        const user = await User.findById(id);

        if (user) {
            //Destructuring the user details
            const { password, ...resetofUserDetails } = user._doc;

            res.status(200).json({
                success: true,
                message: "Yes, User is loggedin",
                data: resetofUserDetails,
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Get loggedin users details
// @route   GET /api/v1/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    try {
        //Getting the id from the protect route
        const id = req.user._id;

        //Find the user
        const user = await User.findById(id);

        if (user) {
            //Destructuring the user details
            const { password, ...resetofUserDetails } = user._doc;

            //Sending Resopnse
            res.status(200).json({
                success: true,
                message: "User detials retrival sucesss",
                data: resetofUserDetails,
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Edit users details
// @route   PUT /api/v1/users/edit-profile
// @access  Private
const editProfile = asyncHandler(async (req, res) => {
    try {
        const { name, about, phno, address, profileImg } = req.body;

        const user = await User.findById(req.user._id);
        if (user) {
            // Update user profile fields
            user.name = name || user.name;
            user.about = about || user.about;
            user.phno = phno || user.phno;
            user.address = address || user.address;
            user.image = profileImg || user.image;

            // Save the updated user profile
            await user.save();

            //Destructuring the user details
            const { password, ...resetofUserDetails } = user._doc;

            //Sending Resopnse
            res.status(200).json({
                success: true,
                message: "User detials updated",
                data: resetofUserDetails,
            });
        } else {
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { getUserProfile, isLoggedIn, editProfile };
