const express = require("express");
const logs = express.Router();
const logsArr = require("../models/log");
const {
  AlphabetSort,
  MistakesFilters,
  CrisisFilter,
  checkForLogKey
} = require("./functions_views");


//Index Route
logs.get("/", (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;
  const response = logsArr.slice()

  if (order) {
    console.log(AlphabetSort(response, order));
    res.json(AlphabetSort(response, order));
  }

  if (mistakes) {
    console.log(MistakesFilters(response, mistakes));
    res.json(MistakesFilters(response, mistakes));
  }

  if (lastCrisis) {
    console.log(CrisisFilter(response, lastCrisis, 10));   //how do i not hard code the number? process.argv or something
    res.json(CrisisFilter(response, lastCrisis, 10));

  } else {
    res.json(response);
  }
});

//SHOW
logs.get("/:id", (req, res) => {
  const { id } = req.params;
  if (logsArr[id]) {
    console.log(logsArr[id]);
    res.json(logsArr[id]);
  } else {
    res.status(404).redirect("/")
  }
});
//CREATE

logs.post("/", checkForLogKey, (req, res) => {
  const { captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis } = req.body;
  console.log(req.body)
  logsArr.push(req.body);
  res.send("ok");
});

//UPDATE
logs.put("/:index", checkForLogKey, (req, res) => {
  const { index } = req.params;
  console.log( req.params, req.body)
  const { captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis } = req.body;
  logsArr[index] = req.body;
  res.send('Ok')
});

//DESTROY
logs.delete('/:index', (req, res) => {
const { index } = req.params;
logsArr.splice(index, 1);
res.send('Ok');
});



module.exports = logs;
