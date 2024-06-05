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
  const nonGenreKeys = ["id", "Name", "Release Date", "IMDB URL", "unknown"];

  const allGenres = peliculas.map((movie) =>
    Object.keys(movie).filter(
      (key) => movie[key] === "1" && !nonGenreKeys.includes(key)
    )
  );

  const uniqueGenres = allGenres.reduce((acc, genres) => {
    genres.forEach((genre) => {
      if (!acc.includes(genre)) {
        acc.push(genre);
      }
    });
    return acc;
  }, []);
  return uniqueGenres.map((genre, index) => ({ id: index + 1, name: genre }));
}
function getReleaseYears(movies) {
  const allYears = movies.map((movie) => movie["Release Date"].split("-")[2]);

  const uniqueYears = allYears.reduce((acc, year) => {
    if (!acc.includes(year)) {
      acc.push(year);
    }
    return acc;
  }, []);

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
