const db = require("../db/queries");

async function getGames(req, res) {
  const games = await db.getFeaturedGames();
  res.render("index", { games: games });
}

async function getAllGames(req, res) {
  const games = await db.getAllGames();
  res.render("allGames", { games: games });
}

module.exports = {
  getGames,
  getAllGames,
};
