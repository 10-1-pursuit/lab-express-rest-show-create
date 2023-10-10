const express = require('express')
const logs = express.Router();
const logsArr = require("../models/logs_model")



logs.get("/", (req, res) => {
    res.json(logsArr)
});

logs.get('/:arrNum', (req, res) =>{
    const { arrNum } = req.params;
    if(logsArr[arrNum]){
        res.json(logsArr[arrNum])
    }else{
        res.status(404).send("Log not found")
    }
});

module.exports = logs;