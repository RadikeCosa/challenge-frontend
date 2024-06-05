const express = require("express");
const cors = require("cors");
const { peliculas, scores } = require("./utils/dataLoader");
const routes = require("./routes/routes");
const {
  calculateMovieRatings,
  mergeMoviesWithRatings,
  getAverageByYear,
} = require("./utils/ratingFunctions");

const {
  filterByGenre,
  checkUserRateMovie,
  getGenres,
  getReleaseYears,
} = require("./utils/filters");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/api/peliculas/analisis/:genre", (req, res) => {
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const { genre } = req.params;
  const peliculasFiltradas = filterByGenre(peliculasConRating, genre);
  const averageRatingByYear = getAverageByYear(peliculasFiltradas);

  if (averageRatingByYear.length > 0) {
    res.json(averageRatingByYear);
  } else {
    res
      .status(404)
      .json({ message: `No se encontraron películas del género ${genre}` });
  }
});

app.get("/api/getgenres", (req, res) => {
  const genres = getGenres(peliculas);
  res.json(genres);
});

app.get("/api/getreleaseyears", (req, res) => {
  const years = getReleaseYears(peliculas);
  res.json(years);
});

module.exports = app;
