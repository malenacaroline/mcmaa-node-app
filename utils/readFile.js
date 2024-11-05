const fs = require("fs").promises; // Import fs with promises

const NUM_CITIZENS = 200;

const getCitizens = (allCitizens, numCitizens) => {
  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = allCitizens.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCitizens[i], allCitizens[j]] = [allCitizens[j], allCitizens[i]]; // Swap elements
  }

  return allCitizens.slice(0, numCitizens);
};

const readFile = async (file) => {
  try {
    const data = await fs.readFile(file, "utf-8");
    const allCitizens = data.split(/\r?\n/); // Handles both Windows (\r\n) and Unix (\n) line endings

    const selectedCitizens = getCitizens(allCitizens, NUM_CITIZENS);
    return selectedCitizens;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

module.exports = readFile;