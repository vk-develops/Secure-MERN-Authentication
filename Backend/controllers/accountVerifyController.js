import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import AccountVerification from "../models/AccountVerificationModel.js";
import { mailTransport } from "../utils/accountVerificationUtil.js";

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

                        //Sending a succes mail to user
                        mailTransport().sendMail({
                            from: "mightier@gmail.com",
                            to: user.email,
                            subject: "Account Verification Successfull",
                            html: `<h1>Hello ${user.name}</h1>
                                    <h4>Thanks for being a part of our team, please explore and enjoy the app designed for you!</h4>`,
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

export { verifyAccount };
