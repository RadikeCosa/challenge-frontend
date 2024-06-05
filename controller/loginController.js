const { loadDataFromCSV } = require("../utils/dataLoader");
const personas = loadDataFromCSV("personas");

const login = (req, res) => {
  const { user, password } = req.body;
  const persona = personas.find(
    (persona) => persona.id === user && persona["Full Name"] === password
  );
  if (persona) {
    res.json({ message: "Login successful", user: persona });
  } else {
    res.status(401).json({ message: "Invalid user or password" });
  }
};

module.exports = { login };
