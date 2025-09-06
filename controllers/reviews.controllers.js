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
        res.status(500).json({message: error.message});
    }
}

const createReview = async (req, res) => {
    try {
        const { id } = req.params;
        let movie = await Movie.findById(id);
        
        if(!movie) return res.status(400).json({message: 'Movie not found'});
        movie.reviews.push(req.body);
        await movie.save();
        movie = await Movie.findById(id);
        res.status(200).json(movie.reviews);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getReviews,
    createReview
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