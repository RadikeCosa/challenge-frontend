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

module.exports = { calculateMovieRatings, mergeMoviesWithRatings };
