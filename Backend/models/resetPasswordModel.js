import mongoose from "mongoose";

const resetPasswordSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otpToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);

//Export
export default ResetPassword;
