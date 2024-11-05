const axios = require("axios");
require("dotenv").config();
const DECRYPT_URL =
  process.env.API_PALPATINE_URL ||
  "https://txje3ik1cb.execute-api.us-east-1.amazonaws.com/prod/decrypt";
const DECRYPT_KEY =
  process.env.API_PALPATINE_KEY || "ZZ2EtKAyUa6grx5FN5qoQ8dm77K1yp0F1BlNPC8Y";

const decryptData = async (data) => {
  try {
    const response = await axios.post(DECRYPT_URL, data, {
      headers: {
        "x-api-key": DECRYPT_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = decryptData;
