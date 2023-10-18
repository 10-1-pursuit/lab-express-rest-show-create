const express = require("express");
const captainLogs = express.Router();
const captianLogsArr = require("../models/log.js");

captainLogs.get("/", (req, res) => {
    res.send(captianLogsArr)
});

captainLogs.get("/:id", (req, res) => {
    const { id } = req.params;
    if (captianLogsArr[id]) {
        res.send(captianLogsArr[id]);
    } else {
        res.redirect("/404");
    }
});

captainLogs.post("/", (req, res) => {
    const newLog = req.body;
    captianLogsArr.push(newLog);
    res.redirect("/")
});

captainLogs.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (captianLogsArr[id]) {
        captianLogsArr.splice(id, 1);
        res.status(204).end();
    } else {
        res.redirect("/404")
    }
});

captainLogs.put("/:id", (req,res) => {
    const {id} = req.params;
    if (captianLogsArr[id]) {
        captianLogsArr[id] = req.body;
        res.redirect("/logs");
    } else {
        res.redirect("/404");
    }
})

module.exports = captainLogs