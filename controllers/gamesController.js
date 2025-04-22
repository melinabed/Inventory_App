const db = require("../db/queries");

async function getGames(req, res) {
  const games = await db.getAllGames();
  console.log("Games: ", games);
  res.send("Games: " + games.map((game) => game.name).join(", "));
}

module.exports = {
  getGames,
};
