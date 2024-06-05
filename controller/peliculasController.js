const {
  calculateMovieRatings,
  mergeMoviesWithRatings,
} = require("../utils/ratingFunctions");
const {
  filterByName,
  filterByGenre,
  filterByYear,
  filterByRating,
} = require("../utils/filters");
const { peliculas, scores } = require("../utils/dataLoader");

const getPeliculasByName = (req, res) => {
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const { name } = req.params;
  const peliculasFiltradas = filterByName(peliculasConRating, name);
  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res.status(404).json({
      message: `No se encontraron películas cuyo nombre incluya "${name}"`,
    });
  }
};
const getPeliculasByGenre = (req, res) => {
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
};

const getpeliculasByYear = (req, res) => {
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
};

const getpeliculasByRating = (req, res) => {
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
      message: `No se encontraron películas con rating ${rating}`,
    });
  }
};

module.exports = {
  getPeliculasByName,
  getPeliculasByGenre,
  getpeliculasByYear,
  getpeliculasByRating,
};
