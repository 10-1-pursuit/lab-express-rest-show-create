const express = require("express");

const logs = express.Router();

// const logs = require("../app.js");

let logsArray = require("../models/log.js");

logs.get("/", (req, res) => {
  res.send(logsArray);
});

logs.get("/:id", (req, res) => {
    const { id } = req.params
    if (logsArray[id]) {
        res.send(logsArray[id])
    } else {
        res.status(404).send("Sorry page not found!")
    }
})

logs.get("/:index", (req, res) => {
    const { index } = req.params;

    if (logsArray[index]) {
        res.json(logsArray[index])
    } else {
        res.redirect("/*")
    }

    // if (!logsArray[index]) {
    //      res.redirect("/*");
    //  } else {
    //    res.json(logsArray[index]);
    //  }
})

logs.post("/", (req, res) => {
    const newLog = req.body
    if (!newLog) {
        res.send("Sorry cannot create empty log")
    } else {
        logsArray.push(newLog);
        res.json(logsArray)
    }
})

logs.delete("/:index", (req, res) => {
    const index = Number(req.params.index)
    
    const item_selected = logsArray[index];

    if (!item_selected) {
        res.status(404).json({status: false, message: "invalid item index" })
    } else {
        logsArray.splice(index, 1);
        res.json(logsArray)
    }

})


module.exports = logs;
