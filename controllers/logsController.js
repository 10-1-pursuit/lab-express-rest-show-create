const express = require('express');
const logs = express.Router()
const logsArray = require('../models/log.js')
const { filterByMistakes, sortLogs, filterByLastCrisis } = require('../helper.js')

logs.get('/', (req, res) => {

    const { order, mistakes, lastCrisis } = req.query;
    
    let prefix;
    let num;
    
    if(lastCrisis) {
      prefix = lastCrisis.slice(0, 2);
      num = lastCrisis.slice(2); 
    }
    const response = logsArray.slice();

    if (order) {
        res.json(sortLogs(response, order));
    }

    if (mistakes) {
        res.json(filterByMistakes(response, mistakes));
    }

    if (lastCrisis) {
        res.json(filterByLastCrisis(response, prefix, num));
    } else {
        res.json(response);
    }
});

logs.get('/:arrayIndex', (req, res, next) => {
    const { arrayIndex } = req.params;
    if (logsArray[arrayIndex]) {
        res.json(logsArray[arrayIndex])
        next()
    } else {
        res.redirect('/404')
    }
  });

  logs.post('/logs', (req, res, next) => {

    const { captainName } = req.body;
    const { title } = req.body;
    const { post } = req.body;
    const { mistakesWereMadeToday } = req.body;
    const { daysSinceLastCrisis } = req.body;



    logsArray.push({ captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis });

    res.send('ok')
    next()
});

logs.delete('/:arrayIndex', (req, res, next) => {
    const arrayIndex = parseInt(req.params.arrayIndex);
    if(arrayIndex===0 || arrayIndex>=logsArray.length) {

        res.redirect('/404')
    } else {
        res.json(logsArray.splice([arrayIndex], 1));
    }
  });
  
  logs.put('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    const { captainName } = req.body;
    logsArray[arrayIndex] = { captainName };
    res.send('Ok');
  });

module.exports = logs;