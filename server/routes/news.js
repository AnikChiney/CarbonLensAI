import express from "express";
import axios from "axios";
import dotenv from "dotenv";
// 1. Import the mockNews object from your local file
import { mockNews } from "../mockData/globalNews.js"; 

dotenv.config();
const router = express.Router();
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// Helper to ensure all articles use 'urlToImage' for your frontend
const formatArticles = (articles) => {
  return articles.map(art => ({
    ...art,
    urlToImage: art.image || art.urlToImage || art.url // Fallback chain
  }));
};

// ---------------------------------------------------------
// 1. GLOBAL NEWS ROUTE
// ---------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const query = "climate OR environment OR sustainability";
    const { page = 1, pageSize = 10 } = req.query;

	const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=${pageSize}&page=${page}&apikey=${GNEWS_API_KEY}`;

    const response = await axios.get(url, { timeout: 5000 });
    const liveArticles = formatArticles(response.data.articles || []);

    // 2. SMART MERGE: 
    // If GNews gives only 1 result, we add articles from your local mockNews.articles
    const combinedArticles = liveArticles.length < 5 
      ? [...liveArticles, ...mockNews.articles].slice(0, 12) 
      : liveArticles;

    res.status(200).json({ 
      articles: combinedArticles, 
      totalResults: combinedArticles.length 
    });
  } catch (error) {
    console.error("GNEWS GLOBAL ERROR:", error.message);
    // 3. FULL FALLBACK: Use your local mockNews object
    res.status(200).json({ 
      articles: mockNews.articles, 
      totalResults: mockNews.numArticles 
    });
  }
});

// ---------------------------------------------------------
// 2. LOCAL NEWS ROUTE (Keep GNews here as you said it works)
// ---------------------------------------------------------
router.get("/local", async (req, res) => {
  try {
    const { location = "India" } = req.query;
    const query = `${location} environment climate`;
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${GNEWS_API_KEY}`;

    const response = await axios.get(url, { timeout: 5000 });
    const articles = formatArticles(response.data.articles);

    res.status(200).json({ articles, totalResults: response.data.totalArticles });
  } catch (error) {
    console.error("GNEWS LOCAL ERROR:", error.message);
    res.status(200).json({ articles: [], totalResults: 0 });
  }
});

// ---------------------------------------------------------
// 3. TOP HEADLINES ROUTE
// ---------------------------------------------------------
router.get("/top-headlines", async (req, res) => {
  try {
    const { category } = req.query;
    const topic = category && category !== "All" ? category.toLowerCase() : "world";
    const url = `https://gnews.io/api/v4/top-headlines?category=${topic}&lang=en&max=10&apikey=${GNEWS_API_KEY}`;

    const response = await axios.get(url, { timeout: 5000 });
    const articles = formatArticles(response.data.articles);

    // If headlines are empty, fallback to local mockNews articles
    const finalArticles = articles.length > 0 ? articles : mockNews.articles.slice(0, 10);
    res.status(200).json({ articles: finalArticles, totalResults: finalArticles.length });
  } catch (error) {
    console.error("GNEWS HEADLINES ERROR:", error.message);
    res.status(200).json({ articles: mockNews.articles.slice(0, 10), totalResults: 10 });
  }
});

export default router;