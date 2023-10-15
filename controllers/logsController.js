const express = require("express");
const logsController = express.Router();

let logsArray = require("../models/logs.js");

const { logsValidator } = require("../models/validator.js");

logsController.get("/", (request, response) => {
  response.send(logsArray);
});

logsController.get("/:index", (request, response) => {
  const { index } = request.params;

  if (logsArray[index]) {
    response.json(logsArray[index]);
  } else {
    response.redirect("/400");
  }
});

module.exports = logsController;
