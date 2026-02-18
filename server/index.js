import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js"; // auth routes
// import other routers if you have them

// -------------------- CONFIGURATION -------------------- //
const app = express();

// -------------------- MIDDLEWARE -------------------- //
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// -------------------- CORS CONFIG -------------------- //
// Allow localhost for dev and deployed frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://carbonlensai-1.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server requests
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS policy: Origin not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests
app.options("*", cors());

// -------------------- ROOT ROUTE -------------------- //
app.get("/", (req, res) => {
  res.status(200).send("Backend is running!");
});

// -------------------- API ROUTES -------------------- //
app.use("/auth", authRoutes);

// -------------------- DATABASE -------------------- //
connectDB();

// -------------------- START SERVER -------------------- //
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
