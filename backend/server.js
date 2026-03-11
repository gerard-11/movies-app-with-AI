require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';

// Middleware
app.use(cors());
app.use(express.json());

// Validate API Key on startup
if (!TMDB_API_KEY) {
  console.error('❌ TMDB_API_KEY not found in .env');
  process.exit(1);
}

console.log('✅ TMDB_API_KEY loaded');

// Helper function to make TMDB API calls
async function getTMDBData(endpoint, params = {}) {
  try {
    const config = {
      params: {
        api_key: TMDB_API_KEY,
        ...params,
      },
    };
    const { data } = await axios.get(`${TMDB_BASE_URL}${endpoint}`, config);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    throw new Error(`Failed to fetch ${endpoint}`);
  }
}

// Routes

// GET /api/trending - Get trending movies
app.get('/api/trending', async (req, res) => {
  try {
    const data = await getTMDBData('trending/movie/day');
    res.json(data.results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/genres - Get available genres
app.get('/api/genres', async (req, res) => {
  try {
    const data = await getTMDBData('genre/movie/list');
    res.json(data.genres || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/search - Search for movies
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const data = await getTMDBData('search/movie', { query });
    res.json(data.results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/discover - Get movies by genre
app.get('/api/discover', async (req, res) => {
  try {
    const { genre_id } = req.query;
    if (!genre_id) {
      return res.status(400).json({ error: 'genre_id parameter is required' });
    }
    const data = await getTMDBData('discover/movie', {
      with_genres: genre_id,
    });
    res.json(data.results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/movie/:id - Get movie detail
app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getTMDBData(`movie/${id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/movie/:id/similar - Get similar movies
app.get('/api/movie/:id/similar', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getTMDBData(`movie/${id}/similar`);
    res.json(data.results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'BFF is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎬 CineApp BFF (Backend For Frontend) running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health\n`);
});
