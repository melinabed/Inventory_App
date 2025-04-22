const pool = require("./pool");

async function getAllGames() {
  const result = await pool.query("SELECT * FROM games");
  return result.rows;
}

module.exports = {
  getAllGames,
};
