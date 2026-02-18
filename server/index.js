// server/index.js
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
import { generalRouter } from "./routes/main.js";

// -------------------- CONFIGURATION -------------------- //
const app = express();

// -------------------- MIDDLEWARE -------------------- //
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Security headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Logger
app.use(morgan("common"));

// -------------------- CORS CONFIG -------------------- //
const allowedOrigins = [
  "http://localhost:3000",                // local frontend
  "https://carbonlensai-1.onrender.com"   // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// -------------------- HANDLE PRE-FLIGHT OPTIONS -------------------- //
app.options("*", cors());

// -------------------- ROOT ROUTE -------------------- //
app.get("/", (req, res) => {
  res.status(200).send("Backend is running!");
});

// -------------------- API ROUTES -------------------- //
app.use("/", generalRouter);

// -------------------- DATABASE -------------------- //
connectDB();

// -------------------- START SERVER -------------------- //
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
