const express = require('express');
const router = express.Router();
const axios = require('axios');
const prisma = require('../prisma/client'); 

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

router.get('/', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search movies 
router.get('/search', async (req, res) => {
  const { query, genre, year, sortBy } = req.query;

  try {
    const params = {
      api_key: TMDB_API_KEY,
      query: query || '',
      with_genres: genre || '',
      primary_release_year: year || '',
      sort_by: sortBy || 'popularity.desc',
    };

    const url = query ? `${TMDB_BASE_URL}/search/movie` : `${TMDB_BASE_URL}/discover/movie`;

    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error: error.message });
  }
});

// Get movie details
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${req.params.id}`, {
      params: { api_key: TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie details', error: error.message });
  }
});

module.exports = router;
