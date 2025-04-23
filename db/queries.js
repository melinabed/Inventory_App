const pool = require("./pool");

async function getFeaturedGames() {
  const result = await pool.query("SELECT * FROM games LIMIT 6");
  return result.rows;
}

async function getAllGames() {
  const result = await pool.query("SELECT * FROM games");
  return result.rows;
}

async function getAllCategories() {
  const subgenreResult = await pool.query("SELECT * FROM subgenres");
  const platformResult = await pool.query("SELECT * FROM platforms");
  const gameModeResult = await pool.query("SELECT * FROM game_modes");

  return {
    subgenres: subgenreResult.rows,
    platforms: platformResult.rows,
    gameModes: gameModeResult.rows,
  };
}

module.exports = {
  getFeaturedGames,
  getAllGames,
  getAllCategories,
};
