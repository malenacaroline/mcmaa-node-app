const axios = require("axios");

const getHomeworldName = async (url) => {
  const formattedUrl = url.replace("swapi.co", "swapi.dev");
  try {
    const response = await axios.get(formattedUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getHomeworldByCitizen = async (citizens) => {
  try {
    let arrCitizensInfo = [];
    for (const citizen of citizens) {
      const homeworldInfo = await getHomeworldName(citizen.homeworld);

      const citizenWithHomeworld = {
        name: citizen.name,
        homeworld: homeworldInfo.name,
      };
      arrCitizensInfo.push(citizenWithHomeworld);
    }
    return arrCitizensInfo;
  } catch (error) {
    throw error;
  }
};

module.exports = getHomeworldByCitizen;
