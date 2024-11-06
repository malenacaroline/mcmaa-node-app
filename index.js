require("dotenv").config();
const readFile = require("./utils/readFile");
const decryptData = require("./utils/decryptData");
const removeDuplicates = require("./utils/removeDuplicates");
const getHomeworldByCitizen = require("./utils/getHomeworlds");
const groupData = require("./utils/groupData");

const FILE = process.env.SUPER_SECRET_FILE || "super-secret-data.txt";
const MAX_NUM_CITIZENS = 200;

const breakSecret = async () => {
  console.log("Starting breaking secret...");
  try {
    const dataFile = await readFile(FILE, MAX_NUM_CITIZENS);
    const decryptedData = await decryptData(dataFile);
    const formattedData = decryptedData.map(JSON.parse);
    const filteredCitizens = removeDuplicates(formattedData);
    const homeworldsByCitizens = await getHomeworldByCitizen(filteredCitizens);
    groupData(homeworldsByCitizens);

  } catch (err) {
    throw err;
  }
};

breakSecret();
