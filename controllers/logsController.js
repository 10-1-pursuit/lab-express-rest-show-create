const express = require("express");

const logs = express.Router();

const logsArray = require("../models/log.js");

logs.get("/", (req, res) => {
  res.send(logsArray);
});

logs.get("/:id", (req, res) => {
  const { id } = req.params;
  if (logsArray[id]) {
    res.json(logsArray[id]);
  } else {
    res.redirect("/*");
  }
});

logs.post("/", (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[logsArray.length - 1]);
});

logs.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(logsArray.splice(id, 1));
});

logs.put("/:id", (req, res) => {
  const { id } = req.params;
  logsArray[id] = req.body;
  if (logsArray[id]) {
    res.redirect("/logs");
  } else {
    res.redirect("/*");
  }
});

module.exports = logs;
