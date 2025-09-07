const express = require('express');
const router = express.Router();
const { getReviews, createReview, updateReview, deleteReview } = require('../controllers/reviews.controllers');


// Get all reviews from a movie
router.get('/:id', getReviews);

// Create a review for a movie
router.post('/:id', createReview);

// Update a review for a movie
router.put('/:id', updateReview);

// Delete a review for a movie
router.delete('/:id', deleteReview);

module.exports = router;