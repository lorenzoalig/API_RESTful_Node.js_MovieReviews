const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const moviesRoute = require('./routes/movie.route.js');
const reviewsRoute = require('./routes/review.route.js')
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;


// Middleware
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use("/api/movies", moviesRoute);
app.use('/api/movies/reviews', reviewsRoute);


// Connection to the database
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Connected to the database!");
    app.listen(
        PORT,
        () => console.log(`it's alive and well on http://localhost:${PORT}`)
    );
})
.catch((error) => {
    console.log(error);
});
