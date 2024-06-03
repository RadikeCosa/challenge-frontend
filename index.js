const express = require("express");
const { loadDataFromCSV } = require("./utils/dataLoader");
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
const personas = loadDataFromCSV("personas");
const peliculas = loadDataFromCSV("peliculas");
const scores = loadDataFromCSV("scores");

const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/checkvote/:user_id/:movie_id", (req, res) => {
  const { user_id, movie_id } = req.params;
  const voto = checkUserRateMovie(scores, user_id, movie_id);
  if (voto.length > 0) {
    res.json(voto[0]);
  } else {
    res.status(404).json({ error: "Vote not found" });
  }
});

app.post("/api/login", (req, res) => {
  const { user, password } = req.body;
  const persona = personas.find(
    (persona) => persona.id === user && persona["Full Name"] === password
  );
  if (persona) {
    res.json({ message: "Login successful", user: persona });
  } else {
    res.status(401).json({ message: "Invalid user or password" });
  }
});

app.get("/api/peliculas/name/:name", (req, res) => {
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const { name } = req.params;
  const peliculasFiltradas = filterByName(peliculasConRating, name);
  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res.status(404).json({
      message: `No se encontraron películas que el nombre incluya ${name}`,
    });
  }
});

app.get("/api/peliculas/genre/:genre", (req, res) => {
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const { genre } = req.params;
  const peliculasFiltradas = filterByGenre(peliculasConRating, genre);

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res
      .status(404)
      .json({ message: `No se encontraron películas del género ${genre}` });
  }
});

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

app.get("/api/peliculas/ano/:ano", (req, res) => {
  const { ano } = req.params;
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const peliculasFiltradas = filterByYear(peliculasConRating, ano);

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res.status(404).json({
      message: `No se encontraron películas lanzadas en el año ${ano}`,
    });
  }
});
app.get("/api/peliculas/rating/:rating", (req, res) => {
  const { rating } = req.params;
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  const peliculasFiltradas = filterByRating(
    peliculasConRating,
    parseInt(rating)
  );

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res.status(404).json({
      message: `No se encontraron películas calificadas con rating ${rating}`,
    });
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
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
