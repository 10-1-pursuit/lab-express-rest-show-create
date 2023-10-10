const test = console.log;
const express = require("express");
const logs = express.Router();
const logsArr = require("../models/logs_model");

logs.get("/", (req, res) => {
  res.json(logsArr);
});

logs.get("/", (req, res) => {
  const sortedOrder = req.query.order;
  const sortedMistakes = req.query.mistakes;
  const lastCrisis = req.query.lastCrisis;

  const filteredLogs = logsArr.slice();

  if (sortedOrder === "acs") {
    
    const ascAlphabetArr = filteredLogs.sort((a, b) => {
      for (let i = 0; i < Math.min(a.title.length, b.title.length); i++) {
        // if one strings is shorter we get undefined. By limiting the loop to the min length we only compare the charters we have

        const charAstrings = a.title.charCodeAt(i);
        const charBstrings = b.title.charCodeAt(i);
        if (charAstrings !== charBstrings) {
          return charAstrings - charBstrings;
        }
      }
      return a.title.length - b.title.length; //shorter words first
    });

    if (ascAlphabetArr.length === 0) {  //checking for empty arr.
      res.status(420).send("asending array is off");
    } else {
      res.json(ascAlphabetArr);
    }


  } else if (sortedOrder === "desc") {
    const descAlphabetArr = filteredLogs.sort((a, b) =>
      b.title.localeCompare(a.title)
    );

    if (descAlphabetArr.length === 0) {
      res.status(420).send("decending array is off");
    } else {
      res.json(descAlphabetArr);
    }
  } else if (sortedMistakes === true) {
    const mistakesTLogs = logsArr.filter((log) => {
      return log.mistakesWereMadeToday;
    });

    if (mistakesTLogs.length === 0) {
      res.status(420).send("error with ur simple filter");
    } else {
      console.log(mistakesTLogs);
      res.json(mistakesTLogs);
    }
  }

  if (sortedMistakes === false) {
    const mistakesFLogs = logsArr.filter((log) => {
      return !log.mistakesWereMadeToday;
    });
    if (mistakesFLogs.length === 0) {
      res.status(420).send("error with ur simple filter");
    } else {
      console.log(mistakesFLogs);
      res.json(mistakesFLogs);
    }
  }
});

logs.get("/:arrNum", (req, res) => {
  const { arrNum } = req.params;
  if (logsArr[arrNum]) {
    res.json(logsArr[arrNum]);
  } else {
    res.status(404).send(`nothing is found on : ${arrNum}`);
  }
});

module.exports = logs;
