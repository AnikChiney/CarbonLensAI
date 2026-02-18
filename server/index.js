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
  "http://localhost:3000",                 // local frontend dev
  //"http://localhost:5173",                 // if using Vite
  "https://carbonlensai-1.onrender.com"    // deployed frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// -------------------- ROUTES -------------------- //
app.use("/", generalRouter);

// -------------------- DATABASE -------------------- //
connectDB();

// -------------------- START SERVER -------------------- //
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
