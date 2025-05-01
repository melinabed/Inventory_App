const pool = require("./pool");

async function getFeaturedGames() {
  const result = await pool.query("SELECT * FROM sim_games.games LIMIT 6");
  return result.rows;
}

async function getAllGames() {
  const result = await pool.query("SELECT * FROM sim_games.games");
  return result.rows;
}

async function getGameById(gameId) {
  const result = await pool.query(
    "SELECT * FROM sim_games.games WHERE id = $1",
    [gameId]
  );
  return result.rows[0];
}

async function getAllCategories() {
  const subgenreResult = await pool.query(
    "SELECT * FROM sim_games.games.subgenres"
  );
  const platformResult = await pool.query(
    "SELECT * FROM sim_games.games.platforms"
  );
  const gameModeResult = await pool.query(
    "SELECT * FROM sim_games.games.game_modes"
  );

  return {
    subgenres: subgenreResult.rows,
    platforms: platformResult.rows,
    gameModes: gameModeResult.rows,
  };
}

async function getSubCategory(
  category,
  categoryName,
  relation,
  relationColumn
) {
  const result = await pool.query(
    `SELECT g.*
    FROM sim_games.games g
    JOIN sim_games.games.${relation} rel ON g.id = rel.game_id
    JOIN sim_games.games.${category} c ON c.id = rel.${relationColumn}
    WHERE c.name = $1`,
    [categoryName]
  );
  return result.rows;
}

async function postSearchGame(name) {
  const result = await pool.query(
    "SELECT * FROM sim_games.games WHERE name ILIKE $1",
    [`%${name}%`]
  );
  return result.rows;
}

async function postSubmitForm(name, developer, publisher, date, price) {
  const result = await pool.query(
    `INSERT INTO sim_games.games (name, developer, publisher, release_date, price) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, developer, publisher, date, price]
  );
  return result.rows;
}

async function postDeleteGame(gameId) {
  const result = await pool.query("DELETE FROM sim_games.games WHERE id = $1", [
    gameId,
  ]);
  return result;
}

module.exports = {
  getFeaturedGames,
  getAllGames,
  getGameById,
  getAllCategories,
  getSubCategory,
  postSearchGame,
  postSubmitForm,
  postDeleteGame,
};
