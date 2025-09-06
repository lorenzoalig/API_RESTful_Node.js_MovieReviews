const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Please enter a review"]
        },
        rating: {
            type: Number,
            required: [true, "Please enter a rating"]
        },
        user: {
            type: String,
            required: [true, "Missing username"]
        },
        recommend: {
            type: Boolean,
            required: [true, "Missing reccomendation"]
        }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = {
    Review,
    reviewSchema
};