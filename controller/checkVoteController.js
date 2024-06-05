const { scores } = require("../utils/dataLoader");
const { checkUserRateMovie } = require("../utils/filters");

const checkVote = (req, res) => {
  const { user_id, movie_id } = req.params;
  const voto = checkUserRateMovie(scores, user_id, movie_id);
  if (voto.length > 0) {
    res.json(voto[0]);
  } else {
    res.status(404).json({ error: "Vote not found" });
  }
};

module.exports = { checkVote };
