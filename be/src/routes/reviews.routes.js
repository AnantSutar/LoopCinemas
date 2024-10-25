module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all movies.
  router.get("/", controller.all);

  // Select a single movie by title.
  router.get("/select/:movieTitle", controller.findreview);

  router.post("/", controller.create);

  router.put("/select/:post_id", controller.update);

  router.delete("/select/:post_id", controller.delete);

  // Add routes to server.
  app.use("/api/reviews", router);
};
