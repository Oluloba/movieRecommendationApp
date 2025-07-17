const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const prisma = require('../prisma/client');
const axios = require('axios');

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        id: true,
        likedMovies: true,
        favorites: true,
        watchlist: true,
      },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like a movie
router.post('/like', verifyToken, async (req, res) => {
  const { movieId, genres } = req.body;
  try {
    //Ensuring the movie exists in the Database
    await prisma.movie.upsert({
      where: { tmdbId: movieId },
      update: {},
      create: {
        tmdbId: movieId,
        title: 'Unknown',
        genres: genres || [],
      },
    });

    //connects to LikedMovies
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        likedMovies: {
          connect: { tmdbId: movieId },
        },
      },
    });
    res.json({ message: 'Movie added to liked list' });
  } catch (err) {
    res.status(500).json({ message: 'Error liking movie', error: err.message });
  }
  });

// Get Recommendations based on liked genres
router.get('/recommendations', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { likedMovies: true },
    });
  if (!user || !user.likedMovies) return res.json([]);
    const allGenres = user.likedMovies.flatMap(movie => movie.genres || []);
    const genreFrequency = {};

    allGenres.forEach(genre => {
      genreFrequency[genre] = (genreFrequency[genre] || 0) + 1;
    });

    const topGenres = Object.entries(genreFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);

    const tmdbRes = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        with_genres: topGenres.join(','),
        sort_by: 'popularity.desc',
        language: 'en-US',
        page: 1,
      },
    });

    res.json(tmdbRes.data.results);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch recommendations', error: error.message });
  }
});

// Save favorite movie
router.post('/favorites', verifyToken, async (req, res) => {
  const { movieId } = req.body;
  try {
     await prisma.user.upsert({
      where: { tmdbId: movieId },
      update: {},
      create: {
        tmdbId: movieId,
        title: 'Unknown',
        genres: genres || [],
      },
    });

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        favorites: {
          connect: { tmdbId: movieId },
        },
    },
  });

    res.json({message: 'Movie added to favorites'});
  } catch (error) {
    res.status(500).json({ message: 'Could not add to favorites', error: error.message });
  }
});

// Remove favorite movie
router.delete('/favorites/:movieId', verifyToken, async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  try {
     await prisma.user.update({
      where: { id: req.user.id },
      data: {
        favorites: {
          disconnect: { tmdbId: movieId },
        }
      }
    });

    res.json({ message: 'Movie removed from favorites', favorites: updatedFavorites });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting from favorites', error: error.message });
  }
});

// Add to user watchlist
router.post('/watchlist', verifyToken, async (req, res) => {
  const { movieId } = req.body;
  try { 
    await prisma.user.upsert({
      where: { tmdbId: movieId },
      update: {},
      create: {
        tmdbId: movieId,
        title: 'Unknown',
        genres: genres || [],
      },
    });

    await prisma.user.update({
      where: { id: req.user.id },
        data: { 
          watchlist: { 
            connect: {tmdbId, movieId}, 
          }, 
        },
      });
      res.json({ message: 'Movie added to watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Could not add to watchlist', error: error.message });
  }
});

// Remove from watchlist
router.delete('/watchlist/:movieId', verifyToken, async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  try {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { 
        watchlist: { 
          disconnect: {tmdbId: movieId} 
        },
      },
    });

    res.json({ message: 'Movie removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Could not remove from watchlist', error: error.message });
  }
});

module.exports = router;
