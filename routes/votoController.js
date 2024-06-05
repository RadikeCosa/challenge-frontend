// En routes/votoController.js
const express = require("express");
const { checkUserRateMovie } = require("../utils/filters");
const { loadDataFromCSV } = require("../utils/dataLoader");

const router = express.Router();

router.post("/voto", async (req, res) => {
  try {
    const { user_id, movie_id, rating } = req.body;
    const scores = await loadDataFromCSV("scores"); // Esperar a que se carguen los datos

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
    res
      .status(201)
      .json({ message: "Voto registrado con éxito", voto: newVote });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/voto", async (req, res) => {
  try {
    const { user_id, movie_id, rating } = req.body;
    const scores = await loadDataFromCSV("scores"); // Esperar a que se carguen los datos

    const existingVote = checkUserRateMovie(scores, user_id, movie_id);

    if (!existingVote.length) {
      return res.status(404).json({ message: "No se encontró el voto" });
    }

    existingVote[0].rating = rating.toString();

    res.status(200).json({ message: "Rating actualizado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/checkvote/:user_id/:movie_id", async (req, res) => {
  try {
    const { user_id, movie_id } = req.params;
    const scores = await loadDataFromCSV("scores"); // Esperar a que se carguen los datos
    const voto = checkUserRateMovie(scores, user_id, movie_id);
    if (voto.length > 0) {
      res.json(voto[0]);
    } else {
      res.status(404).json({ error: "Vote not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
