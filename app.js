const express = require("express");
const app = express();

app.use(express.json());

const log = require("./models/log.js");

app.get("/", (req, res) => {
  res.send(`Welcome to the captain's log`);
});

app.get("/logs", (req, res) => {
  res.send(log);
});

app.get("/logs/:id", (req, res) => {
  const { id } = req.params;
  if (log[id]) {
    res.json(log[id]);
  } else {
    res.redirect("/*");
  }
});

app.post("/logs", (req, res) => {
  log.push(req.body);
  res.json(log[log.length - 1]);
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
