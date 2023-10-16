const express = require('express');
const logs = express.Router()
const logsArray = require('../models/log.js')
const { filterByMistakes, sortLogs, filterByLastCrisis } = require('../helper.js')

logs.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
    } else if (mistakes) {
        res.json(filterByMistakes(response, mistakes));
    } else if (lastCrisis) {
        res.json(filterByLastCrisis(response, prefix, num));
    } else {
        res.json(response);
    }
});



logs.get('/:arrayIndex', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const { arrayIndex } = req.params;
    if (logsArray[arrayIndex]) {
        res.json(logsArray[arrayIndex])
    } else {
        res.redirect('/404')
    }
  });

  logs.post('/logs', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const id = generateNewId
    const newLog = {
        id,
        title,
        post,
        mistakesWereMadeToday,
        daysSinceLastCrisis
    }
    logsArray.push(newLog)
    res.send('ok')
});

logs.delete('/:arrayIndex', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const arrayIndex = parseInt(req.params.arrayIndex);
    if(arrayIndex===0 || arrayIndex>=logsArray.length) {

        res.redirect('/404')
    } else {
        res.json(logsArray.splice([arrayIndex], 1));
    }
  });
  
  logs.put('/:arrayIndex', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const { arrayIndex } = req.params;
    const { captainName } = req.body;
    logsArray[arrayIndex] = { captainName };
    res.send('Ok');
  });

module.exports = logs;
