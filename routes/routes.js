const express = require("express");
const router = express.Router();
const { login } = require("../controller/loginController");
const { checkVote } = require("../controller/checkVoteController");
const {
  getPeliculasByName,
  getPeliculasByGenre,
  getpeliculasByYear,
  getpeliculasByRating,
} = require("../controller/peliculasController");

// Rutas
router.post("/login", login);
router.get("/checkvote/:user_id/:movie_id", checkVote);
router.get("/peliculas/name/:name", getPeliculasByName);
router.get("/peliculas/genre/:genre", getPeliculasByGenre);
router.get("/peliculas/ano/:ano", getpeliculasByYear);
router.get("/peliculas/rating/:rating", getpeliculasByRating);

module.exports = router;
