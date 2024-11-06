const api = require("./api");

const shuffle = (data) => {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }

  return data;
};

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
