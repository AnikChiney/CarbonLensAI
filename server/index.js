import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

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

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: Origin not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
