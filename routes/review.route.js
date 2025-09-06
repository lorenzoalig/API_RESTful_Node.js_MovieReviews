const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controllers/reviews.controllers');


// Get all reviews from a movie
router.get('/:id', getReviews);

// Create a review for a movie
router.post('/:id', createReview);


module.exports = router;