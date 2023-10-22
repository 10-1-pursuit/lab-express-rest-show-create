// Define a route that shows the array of logs
const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");

// Routes
logs.get("/logs", (req, res) => {
    let filteredLogs = [...logsArray];
    const { order, mistakes, lastCrisis } = req.query;

    if (order === "asc") {
        // Sort the logsArray alphabetically by captainName
        filteredLogs = filteredLogs.sort((a, b) => a.captainName.localeCompare(b.captainName));
    } else if (order === "desc") {
        // Sort the logsArray in reverse alphabetical order by captainName
        filteredLogs = filteredLogs.sort((a, b) => b.captainName.localeCompare(a.captainName));
    }

    if (mistakes === "true") {
        // Filter logs where mistakesWereMadeToday is true
        filteredLogs = filteredLogs.filter(log => log.mistakesWereMadeToday === true);
    } else if (mistakes === "false") {
        // Filter logs where mistakesWereMadeToday is false
        filteredLogs = filteredLogs.filter(log => log.mistakesWereMadeToday === false);
    }

    if (lastCrisis) {
        if (lastCrisis.startsWith("gt")) {
            const threshold = parseInt(lastCrisis.slice(2));
            // Filter logs where daysSinceLastCrisis is greater than the threshold
            filteredLogs = filteredLogs.filter(log => log.daysSinceLastCrisis > threshold);
        } else if (lastCrisis.startsWith("bte")) {
            const threshold = parseInt(lastCrisis.slice(3));
            // Filter logs where daysSinceLastCrisis is greater than or equal to the threshold
            filteredLogs = filteredLogs.filter(log => log.daysSinceLastCrisis >= threshold);
        } else if (lastCrisis.startsWith("lte")) {
            const threshold = parseInt(lastCrisis.slice(3));
            // Filter logs where daysSinceLastCrisis is less than or equal to the threshold
            filteredLogs = filteredLogs.filter(log => log.daysSinceLastCrisis <= threshold);
        }
    }

    res.send(filteredLogs);
});

logs.get("/logs/:arrayIndex", (req, res) => {
    const arrayIndex = req.params.arrayIndex;
    if (arrayIndex >= 0 && arrayIndex < logsArray.length) {
        const log = logsArray[arrayIndex];
        res.json(log);
    } else {
        res.redirect('/invalid');
    }
});

 


module.exports = logs;
