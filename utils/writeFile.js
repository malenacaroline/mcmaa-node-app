const fs = require("fs");

const writeFile = async (groupedData) => {
  let fileContent = "";
  for (const homeworld in groupedData) {
    fileContent += `${homeworld}\n`;
    groupedData[homeworld].forEach((name) => {
      fileContent += `- ${name}\n`;
    });
    fileContent += "\n";
  }

  const outputFile = "citizens-super-secret-info.txt";
  fs.writeFile(outputFile, fileContent, "utf-8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`Secret broken sucessfully! Check out the file ${outputFile}.`);
    }
  });
};

module.exports = writeFile;
