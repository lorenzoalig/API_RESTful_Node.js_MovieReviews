const Movie = require('../models/movie.model.js');


const getReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        
        if(!movie) return res.status(404).json({message: 'Movie not found'});
        const reviews = movie.reviews;

        if(reviews.length == 0) return res.status(200).json({message: 'There are no reviews for this movie'});
        res.status(200).json(reviews);
    } catch (error) {
        if(error.name === 'CastError') {
            return res.status(404).json({message: 'Invalid ID'});
        }
        res.status(500).json({message: error.message});
    }
}

const createReview = async (req, res) => {
    try {
        const { id } = req.params;
        let movie = await Movie.findById(id);
        
        if(!movie) return res.status(404).json({message: 'Movie not found'});
        movie.reviews.push(req.body);
        await movie.save();
        movie = await Movie.findById(id);
        res.status(201).json(movie.reviews[movie.reviews.length - 1]);
    } catch (error) {
        if(error.name === 'CastError') {
            return res.status(404).json({message: 'Invalid ID'});
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        let movie = await Movie.findById(id);

        if(!movie) return res.status(404).json({message: 'Movie not found'});
        const movieReview = movie.reviews.id(req.body._id);

        if(!movieReview) return res.status(404).json({message: 'Review not found'});
        const reviewIndex = movie.reviews.indexOf(movieReview);
        movie.reviews[reviewIndex] = req.body;
        await movie.save();
        res.status(200).json(movie.reviews[reviewIndex]);
    } catch (error) {
        if(error.name === 'CastError') {
            return res.status(404).json({message: 'Invalid ID'});
        }
         if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({message: error.message});
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        let movie = await Movie.findById(id);

        if(!movie) return res.status(404).json({message: 'Movie not found'});
        const reviewIndex = movie.reviews.findIndex(r => r._id.toString() === req.body._id);

        if(reviewIndex < 0) return res.status(404).json({message: 'Review not found'});
        movie.reviews.splice(reviewIndex, 1);
        movie = await movie.save();
        res.status(200).json({message: 'Review deleted successfully'});
    } catch (error) {
        if(error.name === 'CastError') {
            return res.status(404).json({message: 'Invalid ID'});
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({message: error.message});
        }
        res.status(500).json({message: error.message});
    }
}

// Exports controllers
module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview
};



// MY FIRST SCHEMA INSIDE SCHEMA CREATION =)
// const createReview = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let movie = await Movie.findById(id);
//         if(!movie) return res.status(404).json({message: 'Movie not found'});
        
//         const review = await Review.create(req.body);
        
//         movie.reviews.push(review);

//         movie = await Movie.findByIdAndUpdate(id, movie, {new:true});
//         await Review.findByIdAndDelete(review._id);
        
//         res.status(200).json(movie.reviews);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// }