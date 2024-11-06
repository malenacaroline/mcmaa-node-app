const writeFile = require("./writeFile");

const groupData = (homeworldsByCitizens) => {
  const groupedData = homeworldsByCitizens.reduce((item, { name, homeworld }) => {
    if (!item[homeworld]) {
      item[homeworld] = [];
    }
    item[homeworld].push(name);
    return item;
  }, {});
  writeFile(groupedData);
};

module.exports = groupData;
