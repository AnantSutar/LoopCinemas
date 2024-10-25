const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.movie = require("./models/movies.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.moviereview = require("./models/reviews.js")(db.sequelize, DataTypes);
db.moviesession = require("./models/session.js")(db.sequelize, DataTypes);
db.movieticket = require("./models/tickets.js")(db.sequelize, DataTypes);

//Relate moviereview and use.
db.moviereview.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
});

//Relate moviereview and movie.
db.moviereview.belongsTo(db.movie, {
  foreignKey: { name: "movieTitle", allowNull: false },
});

//Relate moviesession and movie.
db.moviesession.belongsTo(db.movie, {
  foreignKey: { name: "movieTitle", allowNull: false },
});

//relate ticket and movie,user,session

db.movieticket.belongsTo(db.movie, {
  foreignKey: { name: "movieTitle", allowNull: false },
});

db.movieticket.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
});

db.movieticket.belongsTo(db.moviesession, {
  foreignKey: { name: "moviesessionid", allowNull: false },
});

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  await seedData(); //sead user data
  await seedMovieData(); //seed movie data
  await seedreviewData(); //seed review data
  await seedsessionData(); //seed session data
  await seedticketData(); //seed ticket data
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id }); //hash the password for security
  await db.user.create({
    username: "test@test.com",
    password_hash: hash,
    first_name: "John",
    last_name: "Doe",
    administrator: false,
    blocked: false,
  });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({
    username: "jane@doe.com",
    password_hash: hash,
    first_name: "Jane",
    last_name: "Doe",
    administrator: false,
    blocked: false,
  });
}

async function seedMovieData() {
  const count = await db.movie.count();

  // Only seed data if necessary.
  if (count > 0) return;
  await db.movie.create({
    movieTitle: "Oppenheimer",
    genre: "Sci-Fi", //insert movie data in movie table
    sessionTimes: "2:00PM 6:00PM",
    desc: "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
    movieImage: "/images/Opp.png",
  });

  await db.movie.create({
    movieTitle: "Barbie",
    genre: "Lovestory",
    sessionTimes: "2:00PM 6:00PM",
    desc: "Barbie suffers a crisis that leads her to question her world and her existence.",
    movieImage: "/images/ba.jpg",
  });

  await db.movie.create({
    movieTitle: "Eqaulizer",
    genre: "Sci-Fi",
    sessionTimes: "2:00PM 6:00PM",
    desc: "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.",
    movieImage: "/images/equ.jpg",
  });

  await db.movie.create({
    movieTitle: "Gran Turismo",
    genre: "Racing",
    sessionTimes: "2:00PM 6:30PM",
    desc: "Based on the unbelievable, inspiring true story of a team of underdogs - a struggling, working-class gamer, a failed former race car driver, and an idealistic motorsport exec - who risk it all to take on the most elite sport in the world",
    movieImage: "/images/gt.jpg",
  });

  await db.movie.create({
    movieTitle: "SOG",
    genre: "Fiction",
    sessionTimes: "2:00PM 6:00PM",
    desc: "Andre Ward's journey from adversity in Oakland to the Hall of Fame, defying odds and guided by faith. He chose family over boxing, inspiring us all.",
    movieImage: "/images/sog.jpg",
  });

  await db.movie.create({
    movieTitle: "Fast and Furious",
    genre: "Racing",
    sessionTimes: "2:00PM 6:00PM",
    desc: "Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.",
    movieImage: "/images/FastX.png",
  });

  await db.movie.create({
    movieTitle: "Meg 2",
    genre: "Fiction",
    sessionTimes: "2:00PM 6:00PM",
    desc: "A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation.",
    movieImage: "/images/1.jpg",
  });

  await db.movie.create({
    movieTitle: "Avatar",
    genre: "Sci-Fi",
    sessionTimes: "2:00PM 6:00PM",
    desc: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    movieImage: "/images/Avatar.jpeg",
  });
}

async function seedreviewData() {
  const count = await db.moviereview.count();

  // Only seed data if necessary.
  if (count > 0) return;
  await db.moviereview.create({
    reviewtext: "Really Good",
    ratingvalue: 4,
    username: "test@test.com", //insert sample review daata
    movieTitle: "Barbie",
  });
}

async function seedsessionData() {
  const count = await db.moviesession.count();

  // Only seed data if necessary.
  if (count > 0) return;
  await db.moviesession.create({
    movietime: "6:00PM",
    numtickets: 10, // insert session data
    movieTitle: "Barbie",
  });
  await db.moviesession.create({
    movietime: "2:00PM",
    numtickets: 10,
    movieTitle: "Barbie",
  });
  await db.moviesession.create({
    movietime: "6:00PM",
    numtickets: 10,
    movieTitle: "Avatar",
  });
  await db.moviesession.create({
    movietime: "2:00PM",
    numtickets: 10,
    movieTitle: "Avatar",
  });
  await db.moviesession.create({
    movietime: "2:00PM",
    numtickets: 8,
    movieTitle: "Eqaulizer",
  });
  await db.moviesession.create({
    movietime: "6:00PM",
    numtickets: 10,
    movieTitle: "Eqaulizer",
  });
  await db.moviesession.create({
    movietime: "2:00PM",
    numtickets: 10,
    movieTitle: "Oppenheimer",
  });
  await db.moviesession.create({
    movietime: "6:00PM",
    numtickets: 10,
    movieTitle: "Oppenheimer",
  });
  await db.moviesession.create({
    movietime: "6:00PM",
    numtickets: 10,
    movieTitle: "Gran Turismo",
  });
  await db.moviesession.create({
    movietime: "2:00PM",
    numtickets: 10,
    movieTitle: "Gran Turismo",
  });
  await db.moviesession.create({
    movietime: "6:00PM",
    numtickets: 10,
    movieTitle: "SOG",
  });
  await db.moviesession.create({
    movietime: "2:00PM",
    numtickets: 10,
    movieTitle: "SOG",
  });
  await db.moviesession.create({
    movietime: "6:00PM",
    numtickets: 10,
    movieTitle: "Fast and Furious",
  });
  await db.moviesession.create({
    movietime: "2:00PM",
    numtickets: 10,
    movieTitle: "Fast and Furious",
  });
  await db.moviesession.create({
    movietime: "6:00PM",
    numtickets: 10,
    movieTitle: "Meg 2",
  });
  await db.moviesession.create({
    movietime: "2:00PM",
    numtickets: 10,
    movieTitle: "Meg 2",
  });
}

async function seedticketData() {
  const count = await db.movieticket.count();

  if (count > 0) return;

  await db.movieticket.create({
    moviesessionid: 5,
    username: "test@test.com",
    movieTitle: "Eqaulizer",
    userticket: 2,
  });
}

module.exports = db;
