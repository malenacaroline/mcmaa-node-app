const removeDuplicates = (citizens) => {
  console.log("removeDuplicates", citizens);
  const seenNames = new Set(); // Set to keep track of unique names
  const uniqueObjects = [];

  citizens.forEach((citizen) => {
    if (citizen.name && !seenNames.has(citizen.name)) {
      // Check if the name hasn't been seen before
      seenNames.add(citizen.name); // Mark this name as seen
      uniqueObjects.push(citizen); // Add the object to the unique list
    }
  });

  return uniqueObjects;
};

module.exports = removeDuplicates;
