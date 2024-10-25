module.exports = (express, app) => {
  const controller = require("../controllers/session.controller.js");
  const router = express.Router();

  // Select all movies.
  router.get("/", controller.all);

  // Select a single movie by title.
  router.get("/moviesession", controller.findsession);

  router.post("/", controller.create);

  router.put("/moviesession/:moviesessionid", controller.update);

  // Add routes to server.
  app.use("/api/session", router);
};
