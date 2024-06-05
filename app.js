const express = require("express");
const peliculasController = require("./routes/peliculasController");
const loginController = require("./routes/loginController");
const votoController = require("./routes/votoController");

const { loadDataFromCSV } = require("./utils/dataLoader");

const { getGenres, getReleaseYears } = require("./utils/filters");

const peliculas = loadDataFromCSV("peliculas");

const app = express();

app.use(express.json());

app.use("/api/peliculas", peliculasController);
app.use("/api/login", loginController);
app.use("/api", votoController);

app.get("/api/getgenres", (req, res) => {
  const genres = getGenres(peliculas);
  res.json(genres);
});
app.get("/api/getreleaseyears", (req, res) => {
  const years = getReleaseYears(peliculas);
  res.json(years);
});
module.exports = app;
