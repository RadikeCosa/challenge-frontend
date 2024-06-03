// peliculasFilters.js
function filterByName(peliculas, name) {
  return peliculas.filter((pelicula) =>
    pelicula.Name.toLowerCase().includes(name.toLowerCase())
  );
}

function filterByGenre(peliculas, genre) {
  const genreKey = genre.charAt(0).toUpperCase() + genre.slice(1);
  return peliculas.filter((pelicula) => pelicula[genreKey] === "1");
}

function filterByYear(peliculas, year) {
  return peliculas.filter(
    (pelicula) =>
      new Date(pelicula["Release Date"]).getFullYear() === parseInt(year)
  );
}
function filterByRating(movies, rating) {
  return movies.filter((movie) => {
    const movieRating = parseFloat(movie.avg_rating);
    const movieRatingInteger = Math.trunc(movieRating);
    return movieRatingInteger === rating;
  });
}
function checkUserRateMovie(scores, user_id, movie_id) {
  return scores.filter(
    (score) => score.user_id === user_id && score.movie_id === movie_id
  );
}
function getGenres(peliculas) {
  // Lista de claves que no son géneros
  const nonGenreKeys = ["id", "Name", "Release Date", "IMDB URL", "unknown"];

  // 1. Mapear: obtener todos los géneros con valor "1" de cada película
  const allGenres = peliculas.map((movie) =>
    Object.keys(movie).filter(
      (key) => movie[key] === "1" && !nonGenreKeys.includes(key)
    )
  );

  // 2. Reducir: convertir la lista de listas en un solo array y eliminar duplicados
  const uniqueGenres = allGenres.reduce((acc, genres) => {
    genres.forEach((genre) => {
      if (!acc.includes(genre)) {
        acc.push(genre);
      }
    });
    return acc;
  }, []);

  // 3. Mapear: crear una lista de objetos con id y nombre
  return uniqueGenres.map((genre, index) => ({ id: index + 1, name: genre }));
}
function getReleaseYears(movies) {
  // 1. Mapear: obtener todos los años de lanzamiento de cada película
  const allYears = movies.map((movie) => movie["Release Date"].split("-")[2]);

  // 2. Reducir: convertir la lista de años en un solo array y eliminar duplicados
  const uniqueYears = allYears.reduce((acc, year) => {
    if (!acc.includes(year)) {
      acc.push(year);
    }
    return acc;
  }, []);

  // 3. Mapear: crear una lista de objetos con id y year
  return uniqueYears.map((year, index) => ({ id: index + 1, year }));
}

module.exports = {
  filterByName,
  filterByGenre,
  filterByYear,
  filterByRating,
  checkUserRateMovie,
  getGenres,
  getReleaseYears,
};
