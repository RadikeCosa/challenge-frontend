// En utils/dataLoader.js
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

function loadDataFromCSV(fileName) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(path.join(__dirname, "../data", `${fileName}.csv`))
      .pipe(csv())
      .on("data", (row) => data.push(row))
      .on("end", () => {
        console.log(`Datos de ${fileName} cargados desde el archivo CSV`);
        resolve(data);
      })
      .on("error", (error) => {
        console.error(`Error al leer el archivo de ${fileName} CSV:`, error);
        reject(error);
      });
  });
}

module.exports = { loadDataFromCSV };
