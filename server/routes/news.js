import express from "express";
import axios from "axios";
import dotenv from "dotenv";
// Import the mockNews object from your local file
import { mockNews } from "../mockData/globalNews.js"; 

dotenv.config();
const router = express.Router();
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// --- UTILS ---

// Standardizes article format so frontend always finds 'urlToImage'
const formatArticles = (articles) => {
  return articles.map(art => ({
    ...art,
    urlToImage: art.image || art.urlToImage || art.url
  }));
};

// Merges live results with local mock data to ensure a full dashboard (min 6 articles)
const getPaddedArticles = (liveArticles) => {
  if (liveArticles.length >= 6) return liveArticles;
  const padding = mockNews.articles.slice(0, 6 - liveArticles.length);
  return [...liveArticles, ...padding];
};

// ---------------------------------------------------------
// 1. GLOBAL NEWS ROUTE
// ---------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    
    // Focused environmental query for Global News
    const query = '("climate change" OR sustainability OR "renewable energy" OR "carbon emissions")';
    
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=${pageSize}&page=${page}&apikey=${GNEWS_API_KEY}`;

    const response = await axios.get(url, { timeout: 5000 });
    const liveArticles = formatArticles(response.data.articles || []);
    const finalArticles = getPaddedArticles(liveArticles);

    res.status(200).json({ 
      articles: finalArticles, 
      totalResults: response.data.totalArticles || finalArticles.length 
    });
  } catch (error) {
    console.error("GLOBAL NEWS ERROR:", error.message);
    res.status(200).json({ articles: mockNews.articles, totalResults: mockNews.numArticles });
  }
});

// ---------------------------------------------------------
// 2. LOCAL NEWS ROUTE (State-wise Environmental Search)
// ---------------------------------------------------------
router.get("/local", async (req, res) => {
  try {
    const { location = "India", page = 1 } = req.query;
    
    // Force the search to find Environment news specifically in the selected State
    const query = `"${location}" AND (environment OR climate OR pollution OR sustainability)`;
    
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&page=${page}&apikey=${GNEWS_API_KEY}`;

    const response = await axios.get(url, { timeout: 5000 });
    const liveArticles = formatArticles(response.data.articles || []);
    
    // For local, we only pad if it's "India". If a specific state has no news, 
    // it's better to show an empty array so the UI can say "No news for this state".
    const finalArticles = location === "India" ? getPaddedArticles(liveArticles) : liveArticles;

    res.status(200).json({ 
        articles: finalArticles, 
        totalResults: response.data.totalArticles || finalArticles.length 
    });
  } catch (error) {
    console.error("LOCAL NEWS ERROR:", error.message);
    res.status(200).json({ articles: [], totalResults: 0 });
  }
});

// ---------------------------------------------------------
// 3. TOP HEADLINES ROUTE (Mapping Chips to Precise Queries)
// ---------------------------------------------------------
router.get("/top-headlines", async (req, res) => {
  try {
    const { category, page = 1 } = req.query;
    
    // Map your frontend categories to high-precision environmental search strings
    const categoryMap = {
      "Climate": '"climate change" OR "global warming"',
      "Energy": '"renewable energy" OR solar OR wind OR "green hydrogen"',
      "Policy": '"environmental policy" OR "climate legislation" OR COP28',
      "Wildlife": '"wildlife conservation" OR biodiversity OR "endangered species"',
      "Pollution": 'pollution OR "plastic waste" OR "air quality"',
      "All": 'environment OR sustainability OR climate'
    };

    const query = categoryMap[category] || categoryMap["All"];
    
    // Using /search instead of /top-headlines because GNews lacks an 'Environment' category
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&page=${page}&sortby=publishedAt&apikey=${GNEWS_API_KEY}`;

    const response = await axios.get(url, { timeout: 5000 });
    const liveArticles = formatArticles(response.data.articles || []);
    const finalArticles = getPaddedArticles(liveArticles);

    res.status(200).json({ 
      articles: finalArticles, 
      totalResults: response.data.totalArticles || finalArticles.length 
    });
  } catch (error) {
    console.error("HEADLINES ERROR:", error.message);
    res.status(200).json({ articles: mockNews.articles.slice(0, 10), totalResults: 10 });
  }
});

export default router;