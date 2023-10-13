const express = require("express");
const logs = express.Router();
const logsArray = require("../models/captainModel")


//Index Route

logs.get("/", (request, response) => {
    response.json("Welcome to the Captain's Log!")
});

logs.get("/logs", (request, response) => {
    response.json(logsArray);
});

logs.get("/:index",(req, res) => {
    const index = req.params.index;
    if (!logsArray[index]) {
        res.redirect("/*")
    } else {
        res.json(logsArray[index]);
    }
});
// create a new log
logs.post("/", (req, res) => {
    const incomingLog = req.body;
    if (!incomingLog) {
        res.redirect("/*");
    } else {
        logsArray.push(incomingLog)
        res.json(logsArray)
    }
});
// put/ update a log
logs.put("/:index", (req, res) => {
const index = req.params.index;
if (!logsArray[index]) {
   res.status(404).json({status: false, message: "Invalid index" });
} else {
    logsArray[index]= req.body;
    req.json(logsArray);
}
});

logs.delete("/:index", (req, res) => {
    const index = Number(req.params.index);

    if (index < 0 || index >= logsArray.length) {
        res.status(404).json({ status: false, message: "Invalid index"});
    } else {
        //make sure it only takes one by using splice
        logsArray.splice(index, 1);
        res.json(logsArray);
    }
});



module.exports = logs;
