const express = require("express");
const { getGenres, getReleaseYears } = require("../utils/filters");

const router = express.Router();

router.get("/getgenres", (req, res) => {
  const genres = getGenres();
  res.json(genres);
});

router.get("/getreleaseyears", (req, res) => {
  const years = getReleaseYears();
  res.json(years);
});

module.exports = router;
