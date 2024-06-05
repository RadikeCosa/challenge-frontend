const express = require("express");
const cors = require("cors");
const { peliculas, scores } = require("./utils/dataLoader");
const routes = require("./routes/routes");
const {
  calculateMovieRatings,
  mergeMoviesWithRatings,
  getAverageByYear,
} = require("./utils/ratingFunctions");

const {
  filterByName,
  filterByGenre,
  filterByYear,
  filterByRating,
  checkUserRateMovie,
  getGenres,
  getReleaseYears,
} = require("./utils/filters");
const { login } = require("./controller/loginController");
const { checkVote } = require("./controller/checkVoteController");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/api/peliculas/analisis/:genre", (req, res) => {
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
});

app.post("/api/voto", (req, res) => {
  const { user_id, movie_id, rating } = req.body;

  if (!user_id || !movie_id || !rating) {
    return res.status(400).json({ message: "Faltan datos del voto" });
  }

  const newVote = {
    user_id: user_id.toString(),
    movie_id: movie_id.toString(),
    rating: rating.toString(),
    Date: new Date().toISOString(),
  };

  scores.push(newVote);
  res.status(201).json({ message: "Voto registrado con éxito", voto: newVote });
});

app.put("/api/voto", (req, res) => {
  const { user_id, movie_id, rating } = req.body;

  const existingVote = checkUserRateMovie(scores, user_id, movie_id);

  if (!existingVote.length) {
    return res.status(404).json({ message: "No se encontró el voto" });
  }

  existingVote[0].rating = rating.toString();

  res.status(200).json({ message: "Rating actualizado con éxito" });
});

app.get("/api/getgenres", (req, res) => {
  const genres = getGenres(peliculas);
  res.json(genres);
});

app.get("/api/getreleaseyears", (req, res) => {
  const years = getReleaseYears(peliculas);
  res.json(years);
});

module.exports = app;
