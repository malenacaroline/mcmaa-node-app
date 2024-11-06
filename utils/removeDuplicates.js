const removeDuplicates = (citizens) => {
  const seenNames = new Set();
  const uniqueObjects = [];

  citizens.forEach((citizen) => {
    if (citizen.name && !seenNames.has(citizen.name)) {
      seenNames.add(citizen.name);
      uniqueObjects.push(citizen);
    }
  });

  return uniqueObjects;
};

module.exports = removeDuplicates;
