import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import AccountVerification from "../models/AccountVerificationModel.js";
import { generateOTP } from "../utils/accountVerificationUtil.js";

// @desc    Register users & and get a token
// @route   POST /api/v1/users/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check for all fields
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are neccessary" });
        }

        //Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "Already a user" });
        }

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Storing the user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            //Generating a token after registering
            generateToken(res, user._id);

            //Destructuring the user details
            const { password, ...resetofUserDetails } = user._doc;

            //Sending Resopnse
            res.status(200).json({
                success: true,
                message: "User registration sucesss",
                data: resetofUserDetails,
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Login registered user and generate token
// @route   POST /api/v1/users/auth/register
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check for all fields
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are necessary" });
        }

        //Check for user
        const user = await User.findOne({ email });
        if (user) {
            //Check for password match
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Passwords does not match",
                });
            } else {
                //Generating a token after logining in
                generateToken(res, user._id);

                //Generating OTP
                const OTP = generateOTP();

                //Hashing the OTP
                const hashedOTP = await bcrypt.hash(OTP, 10);

                //Saving the OTP in the account verification mnodel
                const accVerify = new AccountVerification({
                    owner: user._id,
                    otpToken: OTP,
                });

                //Saving the recor
                await accVerify.save();

                //Destructuring the user details
                const { password, ...resetofUserDetails } = user._doc;

                //Sending Resopnse
                res.status(200).json({
                    success: true,
                    message: "User Login sucesss",
                    data: resetofUserDetails,
                });
            }
        } else {
            return res
                .status(400)
                .json({ success: false, message: "User does not exists" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Logout users & clear token
// @route   POST /api/users/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({
            success: true,
            message: "User logout successful",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { registerUser, loginUser, logoutUser };
