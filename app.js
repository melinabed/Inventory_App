const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/indexRouter");

app.use("/", indexRouter);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const PORT = process.env.LOCAL_PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

//A route shows all games (a new page);
//Categories page shows pages by subgenre, platform, and game mode
//Submit a game brings up a form to add a new game with heavy contraints
//Search allows the page to display a game that was searched for
//Maybe a delete game feature with secret password
//Unique page with more details about game
