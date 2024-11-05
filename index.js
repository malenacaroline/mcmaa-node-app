require("dotenv").config();
const readFile = require("./utils/readFile");
const decryptData = require("./utils/decryptData");
const removeDuplicates = require("./utils/removeDuplicates");

const FILE = process.env.SUPER_SECRET_FILE || "super-secret-data";

const breakSecret = async () => {
  console.log("Starting...");
  try {
    const dataFile = await readFile(FILE);
    const data = dataFile;

    const decryptedData = await decryptData(data);
    const formattedData = decryptedData.map(JSON.parse);
    const filteredCitizens = removeDuplicates(formattedData);


  } catch (err) {
    throw err;
  }
};

breakSecret();
