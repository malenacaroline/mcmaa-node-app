const axios = require("axios");

const decryptData = async (data) => {
  const response = await axios
    .post(
      "https://txje3ik1cb.execute-api.us-east-1.amazonaws.com/prod/decrypt",
      { data },
      {
        headers: {
          "x-api-key": process.env.API_PALPATINE_KEY,
        },
      }
    )
    .then((response) => {
      console.log("response:", response.data);

      return response.data;
    })
    .catch((error) => {
      console.log("error:", error);
      return error;
    });
};

module.exports = decryptData;
