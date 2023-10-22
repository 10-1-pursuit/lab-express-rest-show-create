// Define a route that shows the array of logs
const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");

logs.get("/logs", (req, res) => {
    res.send(logsArray);
});

module.exports = logs;