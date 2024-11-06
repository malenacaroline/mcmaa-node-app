require("dotenv").config();
const constants = require("./constants");
const file = require("./file");
const api = require("./api");
const data = require("./data");

const breakSecret = async () => {
  console.log("Starting breaking secret...");
  try {
    const secretFile = await file.read(constants.FILE);
    const decryptData = await api.decrypt(secretFile);
    const formattedData = data.format(decryptData);
    const citizens = data.removeDuplicates(formattedData);
    const citizensWithHomeworlds = await data.getHomeworldNames(citizens);
    await file.write(citizensWithHomeworlds);
  } catch (err) {
    throw err;
  }
};

breakSecret();
