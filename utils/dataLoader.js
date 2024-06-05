const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const {
  calculateMovieRatings,
  mergeMoviesWithRatings,
} = require("./ratingFunctions");
const {
  filterByName,
  filterByGenre,
  filterByYear,
  filterByRating,
  checkUserRateMovie,
  getGenres,
  getReleaseYears,
} = require("./filters");

const loadDataFromCSV = (fileName) => {
  const data = [];
  fs.createReadStream(path.join(__dirname, "../data", `${fileName}.csv`))
    .pipe(csv())
    .on("data", (row) => data.push(row))
    .on("end", () => {
      console.log(`Datos de ${fileName} cargados desde el archivo CSV`);
    })
    .on("error", (error) => {
      console.error(`Error al leer el archivo de ${fileName} CSV:`, error);
    });
  return data;
};

const personas = loadDataFromCSV("personas");
const peliculas = loadDataFromCSV("peliculas");
const scores = loadDataFromCSV("scores");
const ratings = calculateMovieRatings(scores);

module.exports = {
  loadDataFromCSV,
  personas,
  peliculas,
  scores,
};
