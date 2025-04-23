const { Router } = require("express");
const gamesController = require("../controllers/gamesController");

const indexRouter = Router();

indexRouter.get("/", gamesController.getGames);

indexRouter.get("/allGames", gamesController.getAllGames);

indexRouter.get("/categories", gamesController.getAllCategories);

module.exports = indexRouter;
