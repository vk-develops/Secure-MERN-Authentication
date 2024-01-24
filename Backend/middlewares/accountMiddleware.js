import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ResetPassword from "../models/resetPasswordModel.js";

const verifyResetPasswordLink = asyncHandler(async (req, res, next) => {
    try {
        const { userId, uniqueId } = req.query;

        //Check for valid link
        if (!userId || uniqueId) {
            return res.status(400).json({
                success: false,
                message: "Invalid link, missing parameters.",
            });
        }

        //Check for valid user
        const user = await User.findOne({ userId });
        if (user) {
            //Check for valid reset password record or is it expired
            const resetRecord = await ResetPassword.findOne({
                owner: user._id,
            });
            if (resetRecord) {
                //Check for uniqueId match
                const isUniqueIdMatch = await bcrypt.compare(
                    uniqueId,
                    resetRecord.token
                );
                if (isUniqueIdMatch) {
                    //Assinging user in request and calling next function
                    req.user = user;

                    next();
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid link, token does not match",
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message:
                        "Password reset session expired, please request again for password reset request",
                });
            }
        } else {
            return res
                .status(400)
                .json({ success: false, message: "User does not exists." });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { verifyResetPasswordLink };
