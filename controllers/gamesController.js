const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getGames = asyncHandler(async (req, res) => {
  const games = await db.getFeaturedGames();

  if (!games || games.length === 0) {
    res.status(404).send("No games found");
    return;
  }

  res.render("index", { games: games });
});

const getAllGames = asyncHandler(async (req, res) => {
  const games = await db.getAllGames();

  if (!games || games.length === 0) {
    res.status(404).send("No games found");
    return;
  }

  res.render("allGames", { games: games });
});

module.exports = {
  getGames,
  getAllGames,
};
