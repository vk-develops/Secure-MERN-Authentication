import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import AccountVerification from "../models/AccountVerificationModel.js";
import ResetPassword from "../models/resetPasswordModel.js";
import {
    generateOTP,
    mailTransport,
    Mailgenerator,
} from "../utils/accountVerificationUtil.js";
import { generateRandomID } from "../utils/resetPasswordUtil.js";

// @desc    Verify account by entering the OTP recieved
// @route   POST /api/v1/users/account/verify
// @access  Private
const verifyAccount = asyncHandler(async (req, res) => {
    try {
        const { otp } = req.body;
        const id = req.user._id;

        //Check for input
        if (!otp) {
            return res
                .status(400)
                .json({ success: false, message: "Enter a valid OTP!" });
        }

        //Check for a user
        const user = await User.findById(id);
        if (user) {
            //Check for is user alredy verified
            if (!user.isVerified) {
                //Check for user's account verification model
                const verificationRecord = await AccountVerification.findOne({
                    owner: id,
                });
                if (verificationRecord) {
                    //Check for OTP match
                    const isOTPMatch = await bcrypt.compare(
                        otp,
                        verificationRecord.otpToken
                    );
                    if (isOTPMatch) {
                        //Marking user as a verified user
                        user.isVerified = true;
                        await user.save();

                        //Sending the success message to user's mail
                        let response = {
                            body: {
                                name:
                                    user.name.charAt(0).toUpperCase() +
                                    user.name.slice(1),
                                intro: [
                                    `Congrats ${user.name}, your account has been verified and you may start using our app for free and get dived into the world of the MovieMatic.`,
                                ],
                                outro: "Looking forward to do more business",
                            },
                        };

                        let mail = Mailgenerator.generate(response);

                        //Creating the message needed to be sent
                        let message = {
                            from: process.env.GMAIL_EMAIL_ID,
                            to: user.email,
                            subject: "Account Verification Success",
                            html: mail,
                        };

                        // Sending the mail and handling the response
                        mailTransport().sendMail(message, (error, info) => {
                            if (error) {
                                console.error(
                                    "Error occurred while sending email:",
                                    error
                                );
                            } else {
                                console.log(
                                    "Email sent successfully:",
                                    info.response
                                );
                            }
                        });

                        //Deleting the verification record
                        await verificationRecord.deleteOne();

                        //Sending the response after all executions
                        res.status(200).json({
                            success: true,
                            message: "OTP verified!",
                        });
                    } else {
                        return res.status(409).json({
                            success: false,
                            message: "OTP does not match!",
                        });
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Account verification record not found",
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message:
                        "User is already verified, no need to verify again",
                });
            }
        } else {
            return res
                .status(400)
                .json({ success: false, message: "User does not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Resend OTP to verify user's account
// @route   POST /api/v1/users/account/resend-otp
// @access  Private
const resendOTP = asyncHandler(async (req, res) => {
    try {
        const id = req.user._id;

        //Check for valid user
        const user = await User.findById(id);
        if (user) {
            //Check for is user already verified
            if (!user.isVerified) {
                const verificationRecord = await AccountVerification.findOne({
                    owner: user._id,
                });

                if (verificationRecord) {
                    //Deleting the document if already exists
                    await verificationRecord.deleteOne();
                }

                //Generating a new OTP
                const OTP = generateOTP();

                //Hashing the OTP
                const hashedOTP = await bcrypt.hash(OTP, 10);

                //Storing user and OTP
                const accVerify = new AccountVerification({
                    owner: user._id,
                    otpToken: hashedOTP,
                });

                await accVerify.save();

                //Sending the resend OTP to user's mail
                let response = {
                    body: {
                        name:
                            user.name.charAt(0).toUpperCase() +
                            user.name.slice(1),
                        intro: [
                            `Congrats for being a user of our app. Please verify your account.`,
                            `Your Resended OTP: <strong style="color: #111111;">${OTP}</strong>`,
                        ],
                        outro: "Looking forward to do more business",
                    },
                };

                let mail = Mailgenerator.generate(response);

                let message = {
                    from: process.env.GMAIL_EMAIL_ID,
                    to: user.email,
                    subject: "Resend OTP",
                    html: mail,
                };

                // Sending the mail and handling the response
                mailTransport().sendMail(message, (error, info) => {
                    if (error) {
                        console.error(
                            "Error occurred while sending email:",
                            error
                        );
                    } else {
                        console.log("Email sent successfully:", info.response);
                    }
                });

                //Sending the response
                res.status(200).json({
                    success: true,
                    message: "Resended the OTP to your mail!",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message:
                        "User is already verified, no need to verify again",
                });
            }
        } else {
            return res
                .status(400)
                .json({ success: false, message: "User does not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Send user reset password link
// @route   POST /api/v1/users/account/reset-password
// @access  Public
const generateResetPasswordLink = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        //Check for valid email
        if (!email) {
            return res
                .send(400)
                .json({ success: false, message: "Enter a valid email" });
        }

        //Check for a valid user
        const user = await User.findOne({ email });
        if (user) {
            //Check for is already requested for password reset

            const resetPasswordModel = await ResetPassword.findOne({
                owner: user._id,
            });

            if (!resetPasswordModel) {
                //Generating a random unique id
                const token = generateRandomID();

                //Hashing the link
                const hashedToken = await bcrypt.hash(token, 10);

                //Creating the document in the DB
                const resetPassword = new ResetPassword({
                    owner: user._id,
                    token: hashedToken,
                });

                resetPassword.save();

                //Sending the reset password link to user's mail
                let response = {
                    body: {
                        name:
                            user.name.charAt(0).toUpperCase() +
                            user.name.slice(1),
                        intro: [
                            `You are now reseting your password and this link is only valid for 30 minutes.`,
                            `Your Reset Password Link: <a href="${process.env.APP_FRONTEND_LINK}/reset-password/${user._id}/${token}" style="color: #111111; font-weight: 600; font-size: 16px;">Reset Password</a>`,
                        ],
                        outro: "Looking forward to do more business",
                    },
                };

                let mail = Mailgenerator.generate(response);

                //Creating the message needed to be sent
                let message = {
                    from: process.env.GMAIL_EMAIL_ID,
                    to: user.email,
                    subject: "Reset Password Link",
                    html: mail,
                };

                // Sending the mail and handling the response
                mailTransport().sendMail(message, (error, info) => {
                    if (error) {
                        console.error(
                            "Error occurred while sending email:",
                            error
                        );
                    } else {
                        console.log("Email sent successfully:", info.response);
                    }
                });

                res.status(200).json({
                    success: true,
                    message: "Password reset link sent to your mail",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message:
                        "Reset link already sent to mail, you can change your password only after 30mins from previous request for password reset.",
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

// @desc    Verify the reset password link
// @route   POST /api/v1/users/account/verify-link
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { password } = req.body;

        //Check for all fields
        if (!password) {
            return res
                .status(400)
                .json({ success: false, message: "Enter a valid password" });
        }

        //Find user and update password
        const user = await User.findOne({ _id: req.user._id });

        if (user) {
            //Check for same password
            const isSamePassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isSamePassword) {
                //Hashing the new password
                const hashedPassword = await bcrypt.hash(password, 10);

                //Updating the new password in user's collection and saving
                user.password = hashedPassword;
                user.save();

                //Deleting the resetPasssword record
                const resetPassRecord = await ResetPassword.findOne({
                    owner: user._id,
                });
                if (resetPassRecord) {
                    await resetPassRecord.deleteOne();
                }

                //Sending the success message to user's mail
                let response = {
                    body: {
                        name:
                            user.name.charAt(0).toUpperCase() +
                            user.name.slice(1),
                        intro: [
                            `You have now successfully resetted your password. If this was not done by you please contact admin and change your password immediately.`,
                        ],
                        outro: "Looking forward to do more business",
                    },
                };

                let mail = Mailgenerator.generate(response);

                //Creating the message needed to be sent
                let message = {
                    from: process.env.GMAIL_EMAIL_ID,
                    to: user.email,
                    subject: "Password Reset Success",
                    html: mail,
                };

                // Sending the mail and handling the response
                mailTransport().sendMail(message, (error, info) => {
                    if (error) {
                        console.error(
                            "Error occurred while sending email:",
                            error
                        );
                    } else {
                        console.log("Email sent successfully:", info.response);
                    }
                });

                //Sending a response message
                res.status(200).json({
                    success: true,
                    message: "Password reset was successfull",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "New password cannot be as same as old password",
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

export { verifyAccount, resendOTP, generateResetPasswordLink, resetPassword };
