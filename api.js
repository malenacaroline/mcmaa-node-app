const axios = require("axios");
const constants = require("./constants");
require("dotenv").config();

const decrypt = async (data) => {
  try {
    const response = await axios.post(constants.DECRYPT_URL, data, {
      headers: {
        "x-api-key": constants.DECRYPT_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getHomeworld = async (url) => {
  const formattedUrl = url.replace("swapi.co", "swapi.dev");
  try {
    const response = await axios.get(formattedUrl);
    return response.data;
  } catch (error) {
    return null;
  }
};

module.exports = {
  decrypt,
  getHomeworld,
};
