const readFile = fs.readFile("super-secret-data.txt", "utf-8", (err, data) => {
  if (err) return err;
  return data;
});
