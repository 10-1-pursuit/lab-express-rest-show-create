//DEPEDENCIES
const express = require("express");

 const logsController = require("./controllers/logsController.js");

//COFIGURATION
const app = express();

app.use(express.json())

 app.use("/logs", logsController);


app.get("/", (req, res) => {
  res.send("Welcome to the captain's log App");
});

app.get("*", (req, res) => {
  res.status(404).json({error: "Sorry page not found!"});
});

module.exports = app;
