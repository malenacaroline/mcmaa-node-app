const express = require("express");
const decryptData = require("./decryptData");
const fs = require("fs");
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/decryptData", (req, res) => {
  decryptData(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
