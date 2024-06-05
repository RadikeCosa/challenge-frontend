const {
  calculateMovieRatings,
  mergeMoviesWithRatings,
  getAverageByYear,
} = require("../utils/ratingFunctions");
const { filterByGenre } = require("../utils/filters");
const { peliculas, scores } = require("../utils/dataLoader");

const analisisRatingPorAno = (req, res) => {
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
};

module.exports = { analisisRatingPorAno };
