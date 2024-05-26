const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.get("/data", (req, res) => {
  const data = [];

  fs.createReadStream(path.join(__dirname, "data", "personas.csv"))
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      res.json(data);
    });
});

app.post("/login", (req, res) => {
  const { user, password } = req.body;

  const data = [];

  fs.createReadStream(path.join(__dirname, "data", "personas.csv"))
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      const person = data.find(
        (p) =>
          p.id === user &&
          p["Full Name"].toLowerCase() === password.toLowerCase()
      );

      if (person) {
        res.json({ message: "Login successful", user: person });
      } else {
        res.status(401).json({ message: "Invalid user or password" });
      }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
