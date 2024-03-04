import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        console.log("Generated Token:", token);

        // Set cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "None",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        console.log("Cookie Set Successfully");
    } catch (error) {
        console.error("Error generating token:", error);
    }
};

export default generateToken;
