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

  logs.post('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const { captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis } = req.body;
    const newLog = {
        captainName,
        title,
        post,
        mistakesWereMadeToday,
        daysSinceLastCrisis
    }
    logsArray.push(newLog)
    res.status(201).json(newLog);
});

logs.delete('/:arrayIndex', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const arrayIndex = parseInt(req.params.arrayIndex);
    console.log('Array Index:', arrayIndex);
    console.log('Logs Array:', logsArray);
    if (arrayIndex >= 0 && arrayIndex < logsArray.length) {
        console.log('Log found - deleting...');
        const deletedLog = logsArray.splice(arrayIndex, 1);
        res.json(deletedLog);
    } else {
        console.log('Log not found - sending 404');
        res.redirect('/404')
    }
  });
  
  logs.put('/:arrayIndex', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const { arrayIndex } = req.params;
    const { captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis } = req.body;
    
    if (logsArray[arrayIndex]) {
        logsArray[arrayIndex] = {
            captainName,
            title,
            post,
            mistakesWereMadeToday,
            daysSinceLastCrisis
        };
        res.send('Ok');
    } else {
        res.status(404).json({ error: 'Log not found' });
    }
  });

module.exports = logs;
