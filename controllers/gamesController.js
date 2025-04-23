const db = require("../db/queries");

async function getGames(req, res) {
  const games = await db.getAllGames();
  res.render("index", { games: games });
}

module.exports = {
  getGames,
};
