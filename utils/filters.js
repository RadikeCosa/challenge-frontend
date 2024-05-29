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
module.exports = {
  filterByName,
  filterByGenre,
  filterByYear,
  filterByRating,
  checkUserRateMovie,
};
