module.exports = (express, app) => {
  const controller = require("../controllers/ticket.controller.js");
  const router = express.Router();

  // Select all movies.
  router.get("/", controller.all);

  // Select a single movie by title.
  router.get("/select/:username", controller.one);

  router.post("/", controller.create);


  // Add routes to server.
  app.use("/api/ticket", router);
};
