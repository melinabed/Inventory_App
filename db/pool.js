const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "melinabed",
  database: "sim_games",
  password: "0720",
  port: 5432,
});
