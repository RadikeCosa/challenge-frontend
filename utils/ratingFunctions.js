function calculateMovieRatings(scores) {
  return Object.values(
    scores.reduce((acc, score) => {
      if (!acc[score.movie_id]) {
        acc[score.movie_id] = {
          movie_id: score.movie_id,
          total_ratings: 0,
          total_score: 0,
        };
      }

      acc[score.movie_id].total_ratings++;
      acc[score.movie_id].total_score += parseFloat(score.rating);

      return acc;
    }, {})
  ).map(({ movie_id, total_score, total_ratings }) => ({
    movie_id,
    avg_rating: (total_score / total_ratings).toFixed(1),
  }));
}
function mergeMoviesWithRatings(movies, ratings) {
  return movies.map((movie) => {
    const rating = ratings.find((r) => r.movie_id === movie.id);
    return {
      ...movie,
      avg_rating: rating ? rating.avg_rating : "0",
    };
  });
}
function getAverageByYear(movies) {
  // Agrupar películas por año
  const moviesByYear = movies.reduce((acc, movie) => {
    const year = movie["Release Date"].split("-")[2];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(parseFloat(movie["avg_rating"]));
    return acc;
  }, {});

  // Calcular la calificación promedio para cada año con un decimal
  const averageRatings = Object.keys(moviesByYear).map((year) => {
    const ratings = moviesByYear[year];
    const averageRating = (
      ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
    ).toFixed(1);
    return { year, averageRating: parseFloat(averageRating) }; // Convertir de nuevo a número
  });

  return averageRatings;
}

const idPeliculasGenero = (movies) => {
  return movies.map((pelicula) => pelicula.id);
};
const contarVotos = (scores, arrayId) => {
  // Inicializar el objeto para almacenar el recuento de votos
  const votosContados = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  // Recorrer cada objeto en el array de scores
  scores.forEach((score) => {
    // Verificar si el movie_id coincide con algún valor en arrayId
    if (arrayId.includes(score.movie_id)) {
      // Incrementar el recuento de votos para el rating correspondiente
      votosContados[score.rating]++;
    }
  });

  return votosContados;
};

module.exports = {
  calculateMovieRatings,
  mergeMoviesWithRatings,
  getAverageByYear,
  idPeliculasGenero,
  contarVotos,
};
