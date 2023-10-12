const express = require("express");
const logs = express.Router();
const logsArray = require("../models/captainQuotes");


//Index Route

logs.get("/", (request, response) => {
    response.json("Welcome to the Captain's Log!")

});

logs.get("/logs", (request, response) => {

    response.json(logsArray);
});



module.exports = logs;
