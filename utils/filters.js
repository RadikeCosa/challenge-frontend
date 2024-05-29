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

module.exports = {
  filterByName,
  filterByGenre,
  filterByYear,
};
