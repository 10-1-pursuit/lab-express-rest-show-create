  const express = require('express');
  const logs = express.Router();
  const logsArray = require('../models/log.js')

  logs.get('/', (req, res)=>{
      res.json(logsArray)
    })

  logs.get("/:myId", (req, res) => {
      const { myId } = req.params;
      if (logsArray[myId]) {
        res.send(logsArray[myId]);
      } else {
        res.redirect(logsArray);
      }
    });
    
  logs.delete("/:myId", (req, res)=>{
      const { myId } = req.params;
      const deletedLog = logsArray.splice(req.params.myId, 1);
      res.status(200).json(deletedLog[0])
    })
    
  logs.put("/:myId", (req, res)=>{
      const { myId } = req.params;
      logsArray[myId] = req.body;
      res.status(200).json(logsArray[myId]);
    })
    
  logs.post("/", (req, res) => {
        logsArray.push(req.body);
        res.json(logsArray[logsArray.length - 1])
      });

  module.exports = logs;
