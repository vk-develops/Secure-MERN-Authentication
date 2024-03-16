import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        //Sending a cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });
    } catch (error) {
        console.error("Error generating token:", error);
    }
};

export default generateToken;
