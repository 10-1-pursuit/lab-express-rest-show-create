const express = require("express");
const logs = express.Router();
const logsArray = require("../models/logs");


logs.get("/", (req, res) => {
  res.send("Welcome to the Captain's Log, Ayee Matey 🪝⛵️");
});

logs.get("/logs", (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;
  let filteredLogs = [...logsArray];


  const crisisFilters = {
    lte5: (log) => log.daysSinceLastCrisis <= 5,
    gt10: (log) => log.daysSinceLastCrisis > 10,
    gte20: (log) => log.daysSinceLastCrisis >= 20,
  };

  if (lastCrisis && crisisFilters[lastCrisis]) {
    filteredLogs = filteredLogs.filter(crisisFilters[lastCrisis]);
  } 
  
  if (mistakes === "true" || mistakes === "false") {
    const isMistake = mistakes === "true";
    filteredLogs = filteredLogs.filter(
      (log) => log.mistakesWereMadeToday === isMistake
    );
  }

  if (order === "asc" || order === "desc") {
    filteredLogs.sort((a, b) => {
      const comparison = a.captainName.localeCompare(b.captainName);
      return order === "asc" ? comparison : -comparison;
    });
  }
  res.json(filteredLogs)
 
});

logs.get("/logs/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logsArray[arrayIndex]) {
    res.json(logsArray[arrayIndex]);
    // console.log("excuse", logs[arrayIndex])
  } else res.redirect("https://github.com/joinpursuit/captains-log-api");
});

logs.post("/logs", (req, res) => {
  const {
    captainName,
    title,
    post,
    mistakesWereMadeToday,
    daysSinceLastCrisis,
  } = req.body;
  const newLog = req.body;
  console.log(`sent, ${JSON.stringify(newLog)}`);
  logsArray.push(newLog);
  res.status(201).json(newLog);
});

logs.delete("/logs/:id", (req, res) => {
  const { id } = req.params;
  logsArray.splice(id, 1);
  res.send("Ok");
});



module.exports = logs;
