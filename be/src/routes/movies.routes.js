module.exports = (express, app) => {
  const controller = require("../controllers/movies.controller.js");
  const router = express.Router();

  // Select all movies.
  router.get("/", controller.all);

  // Select a single movie by title.
  router.get("/select/:movieTitle", controller.one);

  // Add routes to server.
  app.use("/api/movies", router);
};
