const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const movies = await db.movie.findAll();

  res.json(movies);
};
exports.one = async (req, res) => {
  const movie = await db.movie.findByPk(req.params.movieTitle);
  res.json(movie);
};

// Create a movie in the database.
exports.create = async (req, res) => {
  const movie = await db.movie.create({
    movieTitle: req.body.movieTitle,
    genre: req.body.genre,
    sessionTimes: req.body.sessionTimes,
    movieImage: req.body.movieImage,
  });

  res.json(movie);
};
