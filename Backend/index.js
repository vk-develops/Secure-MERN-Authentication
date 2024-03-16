import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import accountRoute from "./routes/accountRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

//Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        origin: process.env.APP_FRONTEND_LINK,
    })
);
app.use(cookieParser());

//Express static
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

//HTTP GET Method Test
app.get("/api/v1/", (req, res) => {
    res.status(200).json({ success: true, message: "HTTP Method Success!" });
});

//API's
app.use("/api/v1/users/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/users/account", accountRoute);

//Admin Api
app.use("/api/v1/admin", adminRoute);

//Express Static
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

//Custom Middlewares
app.use(notFound);
app.use(errorHandler);

//App listen
app.listen(PORT, () => {
    console.log(`Server started and running on http://localhost:${PORT}`);
});
