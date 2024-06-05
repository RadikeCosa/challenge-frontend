// loginController.js

const express = require("express");
const { loadDataFromCSV } = require("../utils/dataLoader");

const router = express.Router();
const personasPromise = loadDataFromCSV("personas");

router.post("/", async (req, res) => {
  try {
    const personas = await personasPromise;
    const { user, password } = req.body;
    const persona = personas.find(
      (persona) => persona.id === user && persona["Full Name"] === password
    );
    if (persona) {
      res.json({ message: "Login successful", user: persona });
    } else {
      res.status(401).json({ message: "Invalid user or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error loading user data" });
  }
});

module.exports = router;
