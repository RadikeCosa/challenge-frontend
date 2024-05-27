const express = require("express");
const { personas, peliculas } = require("./utils/dataLoader");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
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

app.get("/peliculas", (req, res) => {
  res.json(peliculas);
});

app.get("/peliculas/:name", (req, res) => {
  const { name } = req.params;
  const peliculasFiltradas = peliculas.filter((pelicula) =>
    pelicula.Name.toLowerCase().includes(name.toLowerCase())
  );
  res.json(peliculasFiltradas);
});

app.get("/peliculas/genre/:genre", (req, res) => {
  let { genre } = req.params;
  genre = genre.toLowerCase(); // Convertir a minúsculas
  const genreKey = genre.charAt(0).toUpperCase() + genre.slice(1); // Capitalizar la primera letra del género
  const peliculasFiltradas = peliculas.filter(
    (pelicula) => pelicula[genreKey] === "1"
  );

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res
      .status(404)
      .json({ message: `No se encontraron películas del género ${genre}` });
  }
});
app.get("/peliculas/ano/:ano", (req, res) => {
  const { ano } = req.params;
  const peliculasFiltradas = peliculas.filter(
    (pelicula) =>
      new Date(pelicula["Release Date"]).getFullYear() === parseInt(ano)
  );

  if (peliculasFiltradas.length > 0) {
    res.json(peliculasFiltradas);
  } else {
    res.status(404).json({
      message: `No se encontraron películas lanzadas en el año ${ano}`,
    });
  }
});

app.listen(3000, () => console.log(`Servidor escuchando en el puerto 3000`));
