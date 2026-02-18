import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

// -------------------- CONFIGURATION -------------------- //
const app = express();

// -------------------- MIDDLEWARE -------------------- //

// ✅ Helmet (fixed version)
app.use(
  helmet({
    crossOriginResourcePolicy: false, // IMPORTANT: fixes CORS issue
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("common"));

// -------------------- CORS CONFIG -------------------- //

const allowedOrigins = [
  "http://localhost:3000",
  "https://carbonlensai-1.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser tools

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Origin not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight
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
