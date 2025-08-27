const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`it's alive and well on http://localhost:${PORT}`)
);

var movieData = [];
var reviewData = [];

// ============================================================================
// =================================== CRUD ===================================
// ============================================================================

// ---- CREATE ----

app.post('/movies', (req, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const { director } = req.body;
    const { releaseYear } = req.body;
    const { genre } = req.body;

    if(!title)
        res.status(400).send({message: 'movie title missing'});
    if(!description)
        res.status(400).send({message: 'movie description missing'});
    if(!director)
        res.status(400).send({message: 'movie director missing'});
    if(!releaseYear)
        res.status(400).send({message: 'movie release year missing'});
    if(!genre)
        res.status(400).send({message: 'movie genre missing'});

    movieData.push({
        id: movieData.length + 1,
        title: title,
        description: description,
        director: director,
        releaseYear: releaseYear,
        genre: genre,
    });

    res.status(201).send({message: 'movie added succesfully!'})
});


// ---- READ ----

// Gets all movies in the database or single movie by title in body:
app.get(
    '/movies',
    (req, res) => {
            res.status(200).send(movieData);
});

// Gets movie by ID through URI Parameter:
app.get(
    '/movies/:id', 
    (req, res) => {
        const { id } = req.params;
        for(i = 0; i < movieData.length; i++) {
            if(movieData[i].id == id)
                res.status(200).send(movieData[i]);
        }
        res.status(404).send({message: 'movie id not found'})
});

// Alternative Get for Global search for parameter:
app.get(
    '/movies/search/:term', 
    (req, res) => {
        const { term } = req.params;
        var searchResult = [];
        for(i = 0; i < movieData.length; i++) {
            if(movieData[i].id == term || movieData[i].title == term || movieData[i].director == term || 
               movieData[i].releaseYear == term || movieData[i].genre == term)
                searchResult.push(movieData[i]);
        }
        if(searchResult.length != 0)
            res.status(200).send(searchResult);
        else
            res.status(404).send({message: 'movie not found'})
});


// ---- UPDATE ----



// ---- DELETE ----

