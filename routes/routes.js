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
const { registerVote, updateVote } = require("../controller/voteController");
const {
  getGenresHandler,
  getReleaseYearsHandler,
} = require("../controller/selectControllers");
const {
  analisisRatingPorAno,
  analisisVotosGenero,
  analisisVotosYRatingPorGenero,
} = require("../controller/analisisController");

// Rutas
router.post("/login", login);
router.get("/checkvote/:user_id/:movie_id", checkVote);
router.get("/peliculas/name/:name", getPeliculasByName);
router.get("/peliculas/genre/:genre", getPeliculasByGenre);
router.get("/peliculas/ano/:ano", getpeliculasByYear);
router.get("/peliculas/rating/:rating", getpeliculasByRating);
router.post("/voto", registerVote);
router.put("/voto", updateVote);
router.get("/getgenres", getGenresHandler);
router.get("/getreleaseyears", getReleaseYearsHandler);
router.get("/peliculas/analisis/:genre", analisisRatingPorAno);
router.get("/peliculas/analisisvotos/:genre", analisisVotosGenero);
router.get(
  "/peliculas/analisisvotosyrating/:genre",
  analisisVotosYRatingPorGenero
);

module.exports = router;
