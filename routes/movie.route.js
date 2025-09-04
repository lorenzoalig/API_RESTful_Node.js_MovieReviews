const router = require('express').Router();
const { getMovies, getMovie, createMovie, updateMovie, deleteMovie } = require('../controllers/movie.controllers.js');

// Get all movies
router.get('/', getMovies);

// Get a movie
router.get('/:id', getMovie);

// Create a movie
router.post('/', createMovie);

// Update a movie
router.put('/:id', updateMovie);

// Delete a movie
router.delete('/:id', deleteMovie);


module.exports = router;