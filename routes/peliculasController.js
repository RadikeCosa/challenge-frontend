// peliculasController.js

const express = require("express");
const {
  calculateMovieRatings,
  mergeMoviesWithRatings,
  getAverageByYear,
} = require("../utils/ratingFunctions");
const {
  filterByName,
  filterByGenre,
  filterByYear,
  filterByRating,
} = require("../utils/filters");
const { loadDataFromCSV } = require("../utils/dataLoader");

const scores = loadDataFromCSV("scores");
const peliculas = loadDataFromCSV("peliculas");

const router = express.Router();

router.get("/name/:name", (req, res) => {
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const { name } = req.params;
  const peliculasFiltradas = filterByName(peliculasConRating, name);
  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res.status(404).json({
      message: `No se encontraron películas que el nombre incluya ${name}`,
    });
  }
});

router.get("/genre/:genre", (req, res) => {
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const { genre } = req.params;
  const peliculasFiltradas = filterByGenre(peliculasConRating, genre);

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res
      .status(404)
      .json({ message: `No se encontraron películas del género ${genre}` });
  }
});

router.get("/ano/:ano", (req, res) => {
  const { ano } = req.params;
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const peliculasFiltradas = filterByYear(peliculasConRating, ano);

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res.status(404).json({
      message: `No se encontraron películas lanzadas en el año ${ano}`,
    });
  }
});

router.get("/rating/:rating", (req, res) => {
  const { rating } = req.params;
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const peliculasFiltradas = filterByRating(
    peliculasConRating,
    parseInt(rating)
  );

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res.status(404).json({
      message: `No se encontraron películas calificadas con rating ${rating}`,
    });
  }
});

module.exports = router;
