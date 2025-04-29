const { Router } = require("express");
const gamesController = require("../controllers/gamesController");

const indexRouter = Router();

indexRouter.get("/", gamesController.getGames);

indexRouter.get("/games", gamesController.getAllGames);

indexRouter.get("/games/:id", gamesController.getGameById);

indexRouter.get("/categories", gamesController.getAllCategories);

indexRouter.get(
  "/categories/:category/:categoryName",
  gamesController.getGamesByCategory
);

indexRouter.get("/getForm", gamesController.getSubmitGameForm);

indexRouter.post("/search", gamesController.searchGame);

indexRouter.post(
  "/submitForm",
  gamesController.validateGameSubmisson,
  gamesController.submitForm
);

indexRouter.post("/delete/:id", gamesController.deleteGame);

module.exports = indexRouter;
