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
  const result = await pool.query("SELECT * FROM subgenres");
  return result.rows;
}

module.exports = {
  getFeaturedGames,
  getAllGames,
  getAllCategories,
};
