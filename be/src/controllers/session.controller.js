const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.moviesession.findAll();
  res.json(posts);
};

exports.findsession = async (req, res) => {
  console.log(req.query.movieTitle);
  const post = await db.moviesession.findOne({
    where: {
      movieTitle: req.query.movieTitle,
      movietime: req.query.movietime,
    },
  });

  res.json(post);
};

exports.create = async (req, res) => {
  const post = await db.moviesession.create({
    movietime: req.body.movietime,
    numtickets: req.body.numtickets,
    movieTitle: req.body.movieTitle,
  });

  res.json(post);
};
exports.update = async (req, res) => {
  const { movieTitle, movietime, userticket, moviesessionid } = req.body;
  console.log(movieTitle);
  console.log(movietime);
  console.log(userticket);
  // Find the record you want to update
  const movieSession = await db.moviesession.findByPk(moviesessionid);
  console.log("here");
  if (!movieSession) {
    return res.status(404).json({ error: "Movie session not found" });
  }

  // Calculate the new number of tickets
  const updatedNumTickets = movieSession.numtickets - userticket;

  // Update the numtickets field
  await movieSession.update({ numtickets: updatedNumTickets });
};
