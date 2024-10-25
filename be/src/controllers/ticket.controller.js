const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.movieticket.findAll();
  res.json(posts);
};
exports.create = async (req, res) => {
  const post = await db.movieticket.create({
    moviesessionid: req.body.moviesessionid,
    username: req.body.username,
    userticket: req.body.userticket,
    movieTitle: req.body.movieTitle,
  });

  res.json(post);
};

exports.one = async (req, res) => {
  const tickets = await db.movieticket.findAll({
    where: {
      username: req.params.username,
    },
  });
  const ticketinfo = [];

  // Iterate through each ticket to get the related moviesession
  for (const ticket of tickets) {
    const session = await db.moviesession.findByPk(ticket.moviesessionid);
    if (session) {
      // If a session is found, add ticket and session information to the array
      ticketinfo.push({
        movietime: session.movietime,
        userticket: ticket.userticket,
        movieTitle: ticket.movieTitle,
        ticketid: ticket.ticketid,
        // Add other ticket or session information as needed
      });
    }
  }
  res.json(ticketinfo);
};
