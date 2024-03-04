import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        // Set cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
            domain: ".vk-develops-movie-matic.vercel.app",
        });
    } catch (error) {
        console.error("Error generating token:", error);
    }
};

export default generateToken;
