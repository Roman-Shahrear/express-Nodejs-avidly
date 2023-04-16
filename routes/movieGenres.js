const express = require('express');
const router = express.Router();
const Joi = require('joi');

// validation function
function movieValidation(movie) {
    const schema = Joi.object({
        movieGenresName: Joi.string().min(3).max(30).required(),
        movieName: Joi.string().min(3).max(30).required(),
        movieYear: Joi.string().required(),
    });
    return schema.validate(movie);
};

const movies = [
    {id: 1, movieGenresName: 'Science fiction',  movieYear: '1968', movieName: 'A Space Odyssey'},
    {id: 2, movieGenresName: 'Thrillers',  movieYear: '1972', movieName: 'The Godfather'},
    {id: 3, movieGenresName: 'Drama', movieYear: '1941', movieName: 'Citizen Kane'}
];

router.get('/', (req, res) => {
    // to read query string by parameters(?sortBy=name)
    // const sortBy = req.params.sortBy;
    // return(movies)
    res.send(movies);
});

// http post request
router.post('/', (req, res) => {
    // validation using Joi with d structuring
    const {error} = movieValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = {
        id: movies.length + 1,
        movieGenresName: req.body.movieGenresName,
        movieYear: req.body.movieYear,
        movieName: req.body.movieName,
    };
    movies.push(movie);
    res.send(movie);
});

// http put request
router.put('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('Your search movie can not find');
    // for validation
    const { error } = movieValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // update
    movie.movieGenresName = req.body.movieGenresName;
    movie.movieYear = req.body.movieYear;
    movie.movieName = req.body.movieName;
    res.send(movie);

});

// http delete request
router.delete('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('Your search movie can not find');
    // delete
    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movie);
});


module.exports = router;