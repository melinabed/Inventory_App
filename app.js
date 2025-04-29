const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");

app.use("/", indexRouter);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("./partials/404");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("./partials/error", { error: err });
});

const PORT = process.env.LOCAL_PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

//Submit a game brings up a form to add a new game with heavy contraints
//Maybe a delete game feature with secret password

//Lastly make it burtiful.

//Error Handling? (80% there)
