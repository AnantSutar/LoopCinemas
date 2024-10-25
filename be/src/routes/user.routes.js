module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // update user
  router.put("/select/:id", controller.update);

  router.delete("/select/:id", controller.delete);

  // Create a new user.
  router.post("/", controller.create);
  // Add routes to server.
  app.use("/api/users", router);
};
