const express = require("express");
const logsController = require("./controllers/logsController");

const app = express();

app.use(express.json()); //middleware: parse json request bodies

//routes
app.get("/", (req, res) => {
  res.send("Welcome to the captain's log");
});

app.use("/logs", logsController);

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
