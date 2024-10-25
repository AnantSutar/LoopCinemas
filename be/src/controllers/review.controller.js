const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.moviereview.findAll();
  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.moviereview.create({
    reviewtext: req.body.reviewtext,
    ratingvalue: req.body.ratingvalue,
    username: req.body.username,
    movieTitle: req.body.movieTitle,
  });

  res.json(post);
};

exports.update = async (req, res) => {
  console.log(req.params.post_id);
  const id = req.params.post_id;
  console.log("review" + req.body.reviewtext);
  console.log("review" + id);
  const moviereview = await db.moviereview.findByPk(id);
  moviereview.reviewtext = req.body.reviewtext;
  moviereview.ratingvalue = req.body.ratingvalue;
  await moviereview.save();

  return res.json(moviereview);
};

exports.findreview = async (req, res) => {
  console.log(req.params.movieTitle);
  const post = await db.moviereview.findAll({
    where: {
      movieTitle: req.params.movieTitle,
    },
  });
  res.json(post);
};

exports.delete = async (req, res) => {
  console.log(req.params.post_id);
  const post = await db.moviereview.findByPk(req.params.post_id);
  await post.destroy();
  res.json(post);
};
