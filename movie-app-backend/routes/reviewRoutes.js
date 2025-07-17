const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const verifyToken = require('../middleware/authMiddleware');

// Create a review
router.post('/', verifyToken, async (req, res) => {
  const { movieId, rating, comment } = req.body;

  try {
    // Create review with prisma, linking user and movie by IDs
    const newReview = await prisma.review.create({
      data: {
        userId: req.user.id,   // assuming req.user.id is an integer user ID
        movieId: Number(movieId), // ensure movieId is a number if coming as string
        rating,
        comment,
      },
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get movie reviews, including username of user
router.get('/:movieId', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        movieId: Number(req.params.movieId),
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
