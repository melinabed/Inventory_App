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

const getGameById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const game = await db.getGameById(id);

  if (!game) {
    res.status(404).send("Game not found");
  }

  if (game.release_date) {
    game.release_date = new Date(game.release_date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  }

  res.render("gameInfo", { game: game });
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await db.getAllCategories();

  if (!categories || categories.length === 0) {
    res.status(404).send("No categories found");
    return;
  }

  res.render("categories", {
    subgenres: categories.subgenres,
    platforms: categories.platforms,
    gameModes: categories.gameModes,
  });
});

const getGamesByCategory = asyncHandler(async (req, res) => {
  const { category, categoryName } = req.params;

  let games;

  if (category === "subgenre") {
    games = await db.getSubCategory(
      "subgenres",
      categoryName,
      "game_subgenres",
      "subgenre_id"
    );
  } else if (category === "platform") {
    games = await db.getSubCategory(
      "platforms",
      categoryName,
      "game_platforms",
      "platform_id"
    );
  } else if (category === "mode") {
    games = await db.getSubCategory(
      "game_modes",
      categoryName,
      "game_game_modes",
      "mode_id"
    );
  }

  if (!games || games.length === 0) {
    res.status(404).send("No games found");
    return;
  }

  res.render("gamesInCategory", {
    games: games,
    categoryName: categoryName,
    category: category,
  });
});

const searchGame = asyncHandler(async (req, res) => {
  const { search } = req.body;

  const games = await db.postSearchGame(search);

  if (!games || games.length === 0) {
    res.status(404).render("/partials/error", { error: error });
    return;
  }

  res.render("searchResults", { games: games });
});

const getSubmitGameForm = asyncHandler(async (req, res) => {
  res.render("submitGameForm");
});

const submitForm = asyncHandler(async (req, res) => {
  const { name, developer, publisher, date, price } = req.body;

  if (!name || !developer || !publisher || !date || !price) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newGame = await db.postSubmitForm(
    name,
    developer,
    publisher,
    date,
    price
  );

  res.redirect("/games");
});

const deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await db.postDeleteGame(id);

  res.redirect("/");
});

module.exports = {
  getGames,
  getAllGames,
  getAllCategories,
  getGameById,
  getGamesByCategory,
  searchGame,
  getSubmitGameForm,
  submitForm,
  deleteGame,
};
