const { getGenres, getReleaseYears } = require("../utils/filters");
const { peliculas } = require("../utils/dataLoader");

const getGenresHandler = (req, res) => {
  const genres = getGenres(peliculas);
  res.json(genres);
};

const getReleaseYearsHandler = (req, res) => {
  const years = getReleaseYears(peliculas);
  res.json(years);
};

module.exports = { getGenresHandler, getReleaseYearsHandler };
