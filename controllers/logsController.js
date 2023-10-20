const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log");

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
  res.json(filteredLogs);
});

logs.get("/logs/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logsArray[arrayIndex]) {
    res.json(logsArray[arrayIndex]);
    // console.log("excuse", logs[arrayIndex])
  } else res.redirect("https://github.com/joinpursuit/captains-log-api");
});

const checkForCaptainKey = (req, res, next) => {
  console.log('✅💯✅')
  if (req.body.hasOwnProperty('captainName')) {
    return next()
  } else {
    res.redirect("https://github.com/joinpursuit/captains-log-api");
  }
}



logs.post("/logs", (req, res) => {
  // console.log(logsArray)
  const {
    captainName,
    daysSinceLastCrisis,
    mistakesWereMadeToday,
    post,
    title,
  } = req.body;
  
  const newLog = {
    captainName,
    daysSinceLastCrisis,
    mistakesWereMadeToday,
    post,
    title,
  };
  console.log(`sent`, newLog);
  logsArray.push(newLog);
  res.status(201).json(logsArray);
});

logs.delete("/logs/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  logsArray.splice(arrayIndex, 1);
  res.status(303).send("Ok");
});

logs.put('/logs/:arrayIndex', checkForCaptainKey, (req, res) => {
  const { arrayIndex } = req.params;
const {captainName} = req.body
logsArray[arrayIndex] = {captainName}
res.status(200).json(logsArray[arrayIndex])
})

module.exports = logs;
