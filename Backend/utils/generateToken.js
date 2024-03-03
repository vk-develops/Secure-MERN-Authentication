const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        // Set cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None", // Adjust as needed based on your scenario
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });
    } catch (error) {
        console.error("Error generating token:", error);
        // Handle the error, e.g., return an error response
    }
};

export default generateToken;
