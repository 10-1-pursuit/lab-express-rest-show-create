const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js")

logs.get("/", (req, res) => {
    res.json(logsArray);
});

logs.get("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    (logsArray[arrayIndex]) ? res.json(logsArray[arrayIndex]) : res.redirect('*');
});

logs.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
});

logs.delete("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    (logsArray[arrayIndex]) ? res.json(logsArray.splice(arrayIndex, 1)) :
        res.redirect('*')
})
module.exports = logs