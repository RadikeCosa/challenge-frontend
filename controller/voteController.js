const { scores } = require("../utils/dataLoader");
const { checkUserRateMovie } = require("../utils/filters");

const registerVote = (req, res) => {
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
};

const updateVote = (req, res) => {
  const { user_id, movie_id, rating } = req.body;

  const existingVote = checkUserRateMovie(scores, user_id, movie_id);

  if (!existingVote.length) {
    return res.status(404).json({ message: "No se encontró el voto" });
  }

  existingVote[0].rating = rating.toString();

  res.status(200).json({ message: "Rating actualizado con éxito" });
};

module.exports = { registerVote, updateVote };
