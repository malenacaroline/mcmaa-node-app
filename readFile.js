const fs = require("fs").promises; // Import fs with promises

const NUM_CITIZENS = 10;

const findCitizens = (allCitizens, numCitizens) => {
  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = citizens.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [citizens[i], citizens[j]] = [citizens[j], citizens[i]]; // Swap elements
  }

  return allCitizens.slice(0, numCitizens);
};

const readFile = async (file) => {
  try {
    const data = await fs.readFile(file, "utf-8");
    const outputFile = "output.txt";

    // Split the file content by line breaks to get each line as a separate string
    const allCitizens = data.split(/\r?\n/); // Handles both Windows (\r\n) and Unix (\n) line endings

    // Get citizens
    const selectedCitizens = findCitizens(allCitizens, NUM_CITIZENS);

    // Write the output to the file, formatted for readability
    await fs.writeFile(
      outputFile,
      JSON.stringify(selectedCitizens, null, 2),
      "utf-8"
    );
    console.log(`Successfully written to ${outputFile}`);

    console.log("Total of citizens:", selectedCitizens.length);
    return selectedCitizens; // Return the lines if needed
  } catch (err) {
    console.error("Error reading file:", err);
    throw err; // Rethrow the error for further handling if necessary
  }
};

module.exports = readFile;