const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a movie title"]
        },

        description: {
            type: String,
            required: [true, "Please enter a movie description"]
        },

        director: {
            type: String,
            required: [true, "Please enter a director"]
        },

        releaseYear: {
            type: Number,
            required: [true, "Please enter a release year"],
            default: 2000
        },

        genre: {
            type: String,
            required: [true, "Please enter a genre"]
        },

        reviews: {
            Type: Object
        }
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
