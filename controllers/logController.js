const express = require("express");
const logs = express.Router();
const logsArray = require("./models/logs.js");


//Index Route
logs.get("/", (request, reponse) => {

    response.json(logsArray);
});


