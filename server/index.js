import dotenv from "dotenv";
dotenv.config();
import carbonRoutes from "./routes/carbon.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
console.log("GNEWS API KEY:", process.env.GNEWS_API_KEY);

import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import newsRoutes from "./routes/news.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";




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
  "http://localhost:5173",
  "https://carbonlensai-1.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

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

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/carbon", carbonRoutes);
// -------------------- DATABASE -------------------- //

connectDB();

// -------------------- START SERVER -------------------- //

const PORT = process.env.PORT || 3011;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
