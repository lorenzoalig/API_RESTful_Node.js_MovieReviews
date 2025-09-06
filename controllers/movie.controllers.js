const Movie = require('../models/movie.model.js');


const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(200).json(movie);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({message: error.message})
    }
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});

        if(!movie) {
                return res.status(404).json({message: 'Movie not found'});
        }
        res.status(200).json(movie);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({message: error.message});
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);

        if(!movie) {
            return res.status(404).json({message: 'Movie not found'});
        }
        res.status(200).json({message: 'Movie deleted succesfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};