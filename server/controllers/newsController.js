import asyncHandler from "../middleware/asyncHandler.js";
import axios from "axios";

const API_URL = "https://newsapi.org/v2";

/* ---------------------------------- */
/* Test Route */
/* ---------------------------------- */
const newsTest = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "ROUTE newsTest IS WORKING" });
});

/* ---------------------------------- */
/* Top Headlines */
/* ---------------------------------- */
const getTopHeadlines = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  const keywords = ["environment", "climate", "carbon"];
  let allArticles = [];

  for (const keyword of keywords) {
    const response = await axios.get(`${API_URL}/top-headlines`, {
      params: {
        q: keyword,
        pageSize: Math.floor(pageSize / keywords.length),
        page,
        apiKey: process.env.NEWS_API_KEY,
        language: "en",
      },
    });

    if (response.status === 200) {
      allArticles = allArticles.concat(response.data.articles);
    }
  }

  res.status(200).json({
    numArticles: allArticles.length,
    articles: allArticles,
  });
});

/* ---------------------------------- */
/* Local News */
/* ---------------------------------- */
const getLocalNews = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 30 } = req.query;

  const city = req.user?.city?.toLowerCase() || "india";

  const response = await axios.get(`${API_URL}/everything`, {
    params: {
      q: city,
      pageSize,
      page,
      apiKey: process.env.NEWS_API_KEY,
      language: "en",
      sortBy: "publishedAt",
    },
  });

  const articles = response.data.articles;

  res.status(200).json({
    numArticles: articles.length,
    articles,
  });
});

/* ---------------------------------- */
/* Global Environmental News */
/* ---------------------------------- */
const getGlobalNews = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 30 } = req.query;

  // Get today's date
  const today = new Date();

  // Get date 7 days ago
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const response = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      q: "(environment OR climate OR carbon OR renewable energy)",
      from: lastWeek.toISOString().split("T")[0], // last 7 days
      sortBy: "publishedAt",
      language: "en",
      pageSize,
      page,
      apiKey: process.env.NEWS_API_KEY,
    },
  });

  const articles = response.data.articles;

  res.status(200).json({
    numArticles: articles.length,
    articles,
  });
});

export {
  newsTest,
  getTopHeadlines,
  getLocalNews,
  getGlobalNews,
};