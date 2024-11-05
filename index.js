const express = require("express");
const readFile = require("./readFile");
const decryptData = require("./decryptData");

const app = express();

app.use(express.json());

const FILE = "super-secret-data.txt";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/decryptData", async (req, res) => {
  try {
    console.log("calling post API");
    
    const dataFile = await readFile(FILE);
    const data = dataFile;
    // console.log("dataFile:", stringFile);
    
    // const decryptedData = await decryptData(data);
    // res.send(decryptedData);
    
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Failed to decrypt data" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
