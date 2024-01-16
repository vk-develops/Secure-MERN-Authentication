import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import accountRoute from "./routes/accountRoute.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

//App init
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

//Built-in Middlewares and Imported ones
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
app.use(cookieParser());

//HTTP GET Method Test
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "HTTP Method Success!" });
});

//API's
app.use("/api/v1/users/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/users/account", accountRoute);

//Custom Middlewares
app.use(notFound);
app.use(errorHandler);

//App listen
app.listen(PORT, () => {
    console.log(`Server started and running on http://localhost:${PORT}`);
});
