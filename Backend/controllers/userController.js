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

export { getUserProfile, isLoggedIn };
