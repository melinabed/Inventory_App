const { Router } = require("express");
const gamesController = require("../controllers/gamesController");

const indexRouter = Router();

indexRouter.get("/", gamesController.getGames);

module.exports = indexRouter;
