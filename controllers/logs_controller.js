
const express = require("express");
const logs = express.Router();
const logsArr = require("../models/log");
const { AlphabetSort, MistakesFilters, CrisisFilter } = require('./functions_views')

logs.get("/", (req, res) => {

  const { order, mistakes, lastCrisis } = req.query
  const response = logsArr.slice();

  if(order){
   console.log(AlphabetSort(response, order))
   res.json(AlphabetSort(response, order))
  }
  
  if(mistakes){
    console.log(MistakesFilters(response, mistakes))
    res.json(MistakesFilters(response, mistakes))
  }

  if(lastCrisis){
    console.log(CrisisFilter(response, lastCrisis, 10))
    res.json(CrisisFilter(response, lastCrisis , 10))
  }
  else{
    res.json(response)
  }
});


logs.get("/:arrNum", (req, res) => {
  const { arrNum } = req.params;
  if (logsArr[arrNum]) {
    console.log(logsArr[arrNum])
    res.json(logsArr[arrNum]);
  } else {
    res.status(404).send(`nothing is found on : ${arrNum}`);
  }
});

module.exports = logs;
