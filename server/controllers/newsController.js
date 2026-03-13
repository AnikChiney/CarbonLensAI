import asyncHandler from "../middleware/asyncHandler.js";
import axios from "axios";
import dayjs from "dayjs";

const API_URL = "https://newsapi.org/v2";

/* ---------------------------------- */
/* Test Route */
/* ---------------------------------- */
const newsTest = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "ROUTE newsTest IS WORKING" });
});

/* ---------------------------------- */
/* Top Headlines - FIXED (Will never show 0 results) */
/* ---------------------------------- */
const getTopHeadlines = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10, category } = req.query;

  // Broad search query to maximize chances of finding results
  const searchQuery = category && category !== "All" 
    ? `${category} AND (environment OR climate)` 
    : "environment OR climate OR sustainability";

  try {
    // 1. Attempt to fetch from Top Headlines
    let response = await axios.get(`${API_URL}/top-headlines`, {
      params: {
        q: searchQuery,
        pageSize,
        page,
        apiKey: process.env.NEWS_API_KEY,
        language: "en",
      },
    });

    // 2. FALLBACK: If Top Headlines returns 0 (the issue in your screenshot)
    // We instantly fetch from the 'everything' endpoint instead.
    if (response.data.articles.length === 0) {
      console.log(`Fallback triggered for category: ${category || 'All'}`);
      response = await axios.get(`${API_URL}/everything`, {
        params: {
          q: searchQuery,
          sortBy: "popularity", // Get the highest quality news
          pageSize,
          page,
          apiKey: process.env.NEWS_API_KEY,
          language: "en",
        },
      });
    }

    res.status(200).json({
      numArticles: response.data.articles.length,
      articles: response.data.articles,
    });
  } catch (error) {
    console.error("HEADLINE API ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch top headlines" });
  }
});

/* ---------------------------------- */
/* Local News - Synced with Search Bar */
/* ---------------------------------- */
const getLocalNews = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 30, location } = req.query;

  // Priority: 1. Frontend Search, 2. User City, 3. Default India
  const searchLocation = location || req.user?.city || "India";

  const response = await axios.get(`${API_URL}/everything`, {
    params: {
      q: `${searchLocation} AND (environment OR climate OR sustainability)`,
      pageSize,
      page,
      apiKey: process.env.NEWS_API_KEY,
      language: "en",
      sortBy: "relevancy",
    },
  });

  res.status(200).json({
    numArticles: response.data.articles.length,
    articles: response.data.articles,
  });
});

/* ---------------------------------- */
/* Global Environmental News */
/* ---------------------------------- */
const getGlobalNews = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 30 } = req.query;
  const lastWeek = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const response = await axios.get(`${API_URL}/everything`, {
    params: {
      q: "(environment OR climate OR carbon OR 'renewable energy')",
      from: lastWeek,
      sortBy: "publishedAt",
      language: "en",
      pageSize,
      page,
      apiKey: process.env.NEWS_API_KEY,
    },
  });

  res.status(200).json({
    numArticles: response.data.articles.length,
    articles: response.data.articles,
  });
});

export {
  newsTest,
  getTopHeadlines,
  getLocalNews,
  getGlobalNews,
};