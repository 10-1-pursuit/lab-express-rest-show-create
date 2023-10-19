const express = require("express");
const cors = require("cors");
const logsController = require("./controllers/logsController");

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Welcome to the captain's log");
});

app.use("/logs", logsController);

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
