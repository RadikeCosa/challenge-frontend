const express = require("express");
const { loadDataFromCSV } = require("./utils/dataLoader");
const {
  calculateMovieRatings,
  mergeMoviesWithRatings,
} = require("./utils/ratingFunctions");
const {
  filterByName,
  filterByGenre,
  filterByYear,
  filterByRating,
} = require("./utils/filters");
const personas = loadDataFromCSV("personas");
const peliculas = loadDataFromCSV("peliculas");
const scores = loadDataFromCSV("scores");

const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/prueba", (req, res) => {
  const ratings = calculateMovieRatings(scores);
  const peliculasConRating = mergeMoviesWithRatings(peliculas, ratings);
  res.json(scores);
});

app.post("/api/login", (req, res) => {
  const { user, password } = req.body;
  const persona = personas.find(
    (persona) =>
      persona.id === user &&
      persona["Full Name"].toLowerCase() === password.toLowerCase()
  );
  if (persona) {
    res.json({ message: "Login successful", user: persona });
  } else {
    res.status(401).json({ message: "Invalid user or password" });
  }
});

app.get("/api/peliculas/name/:name", (req, res) => {
  const { name } = req.params;
  const peliculasFiltradas = filterByName(peliculas, name);
  res.json(peliculasFiltradas);
});

app.get("/api/peliculas/genre/:genre", (req, res) => {
  const { genre } = req.params;
  const peliculasFiltradas = filterByGenre(peliculas, genre);

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res
      .status(404)
      .json({ message: `No se encontraron películas del género ${genre}` });
  }
});

app.get("/api/peliculas/ano/:ano", (req, res) => {
  const { ano } = req.params;
  const peliculasFiltradas = filterByYear(peliculas, ano);

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
  console.log(rating);
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
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
