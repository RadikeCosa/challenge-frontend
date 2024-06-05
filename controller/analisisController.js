const {
  calculateMovieRatings,
  mergeMoviesWithRatings,
  getAverageByYear,
  idPeliculasGenero,
  contarVotos,
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

const analisisVotosGenero = (req, res) => {
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const { genre } = req.params;
  const peliculasFiltradas = filterByGenre(peliculasConRating, genre);
  const arrayId = idPeliculasGenero(peliculasFiltradas);
  const votosPorRating = contarVotos(scores, arrayId);
  if (arrayId.length > 0) {
    res.json(votosPorRating);
  } else {
    res.status(404).json({ message: `No se encontraron películas del género` });
  }
};

module.exports = { analisisRatingPorAno, analisisVotosGenero };
