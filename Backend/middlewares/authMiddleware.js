import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: "Not authorized, token failed",
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed",
        });
    }
});

const isAdmin = async (req, res, next) => {
    const currentUser = req.user;

    //Check for is current loggedin user is admin or not
    if (currentUser.role === "Admin") {
        next();
    } else {
        return res.status(400).json({
            success: false,
            message: "Only admins can access this page",
        });
    }
};

export { protect, isAdmin };
