const api = require("./api");

const shuffle = (data) => data.sort(() => Math.random() - 0.5);

const format = (data) => {
  return data
    .map(JSON.parse)
    .map(({ name, homeworld }) => ({ name, homeworld }));
};

const removeDuplicates = (data) => {
  return data.reduce((acc, currentValue) => {
    if (!acc[currentValue.homeworld]) acc[currentValue.homeworld] = [];
    if (acc[currentValue.homeworld].includes(currentValue.name)) return acc;
    acc[currentValue.homeworld].push(currentValue.name);
    return acc;
  }, {});
};

const getHomeworldNames = async (citizens) => {
  const homeworldsUrls = Object.keys(citizens);

  const citizensWithHomeworlds = await Promise.all(
    homeworldsUrls.map((url) => api.getHomeworld(url))
  )
    .then((values) => {
      const data = {};
      values.forEach(({ name }, index) => {
        data[name] = citizens[homeworldsUrls[index]];
      });
      return data;
    })
    .catch(() => {
      return null;
    });

  return citizensWithHomeworlds || citizens;
};

module.exports = {
  shuffle,
  format,
  removeDuplicates,
  getHomeworldNames,
};
