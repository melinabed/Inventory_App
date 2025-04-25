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

indexRouter.post("/search", gamesController.searchGame);

module.exports = indexRouter;
