const fs = require("fs");
const citizens = require("./data");
const constants = require("./constants");

const read = async (file) => {
  try {
    const data = await fs.promises.readFile(file, "utf-8");
    const allCitizens = data.split(/\r?\n/); // Handles both Windows (\r\n) and Unix (\n) line endings
    const shuffledCitizens = citizens.shuffle(allCitizens);
    const selectedCitizens = shuffledCitizens.slice(
      0,
      constants.MAX_NUM_CITIZENS
    );
    return selectedCitizens;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

const write = async (data) => {
  let fileContent = "";
  Object.entries(data).forEach(([homeworldName, homeworldCitizens]) => {
    fileContent += `${homeworldName}\n`;
    homeworldCitizens.forEach((name) => {
      fileContent += `- ${name}\n`;
    });
    fileContent += "\n";
  });

  const outputFile = "citizens-super-secret-info.txt";
  fs.writeFile(outputFile, fileContent, "utf-8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`Secret broken sucessfully! Check out the file ${outputFile}.`);
    }
  });
};

module.exports = {
  read,
  write,
};
