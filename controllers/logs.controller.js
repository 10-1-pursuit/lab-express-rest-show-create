const express = require("express");
const logs = express.Router();
const logsArray = require("../models/logs");

logs.get("/", (req, res) => {
    res.send("Welcome to the Captain's Log");
});

logs.get('/logs', (req, res) => {
    res.json(logsArray)
})
logs.get("/logs/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if (logsArray[arrayIndex]) {
        res.json(logsArray[arrayIndex]);
    } else res.redirect("https://github.com/joinpursuit/captains-log-api");
});

logs.post('/logs', (req, res) => {
    const {
        captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis,
    } = req.body

    const newLog = {
        captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis,
    }
    logsArray.push(newLog)
    res.status(201).json(newLog)
});

logs.delete("/logs/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    logsArray.splice(arrayIndex, 1);
    res.status(303).send("Ok");
})










module.exports = logs;