import express from "express";
import axios from "axios";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const NEWS_API_KEY = process.env.NEWS_API_KEY;

if (!NEWS_API_KEY) {
  console.error("❌ NEWS API KEY is missing. Add it to your .env file!");
}

// GET /news?page=1&pageSize=10
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // 🔹 Fetch only the last 7 days (Free plan safe)
    const toDate = dayjs().format("YYYY-MM-DD");
    const fromDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");

    const query = "climate OR environment OR sustainability OR 'carbon emissions'";

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&from=${fromDate}&to=${toDate}&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("NEWS API ERROR:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to fetch news",
      error: error.response?.data || error.message,
    });
  }
});

export default router;