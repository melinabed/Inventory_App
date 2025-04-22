const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => res.send("Hello World"));

const PORT = process.env.LOCAL_PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
