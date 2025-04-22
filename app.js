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
