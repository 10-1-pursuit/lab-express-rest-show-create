// dependencies
const express = require("express");

// config
const app = express();
const logsController = require("./controllers/logsController");
// routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Captain's Log");
});

app.use("/logs", logsController);

app.get("*", (req, res) => {
  res.status(404).redirect("/logs");
});

// export
module.exports = app;
