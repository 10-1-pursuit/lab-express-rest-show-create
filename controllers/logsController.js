const express = require("express");
const logs = express.Router();

let logsArray = require("../models/logs.js");

const { logsValidator } = require("../models/validator.js");

logs.get("/", (request, response) => {
  response.send(logsArray);
});

logs.get("/:index", (request, response) => {
  const { index } = request.params;
  response.json(logsArray);

  if (logsArray[index]) {
    response.json(logsArray[index]);
  } else {
    response.redirect("/400");
  }
});
logs.post("/", logsValidator, (request, response) => {
  logsArray.push(request, body);
  response.json(logsArray[logsArray.length - 1]);
});
logs.put("/:index", logsValidator, (request, response) => {
  const { index } = request.params;
  if (logsArray[index]) {
    logsArray.splice(index, 0, request.body);
    response.status(200).json({ status: 200, message: "resource updated" });
  } else {
    response.redirect("/404");
  }
});

logs.delete("/:index", logsValidator, (request, response) => {
  const { index } = request.params;
  if (logsArray[index]) {
    logsArray.splice(index, 1);
    response.status(200).json({ status: 200, message: "resource deleted" });
  } else {
    response.redirect("/400");
  }
});

module.exports = logs;
