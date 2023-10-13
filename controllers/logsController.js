const express = require("express");
const logs = express.Router();
const logsArray = require("../models/captainModels")


//Index Route

logs.get("/", (request, response) => {
    response.json("Welcome to the Captain's Log!")
});

logs.get("/logs", (request, response) => {
    response.json(logsArray);
});

logs.get("/logs/:index",(req, res) => {
    const index = req.params.index;
    if (!logsArray[index]) {
        res.redirect("/*")
    } else {
        res.json(logsArray[index]);
    }
});
// create a new log
logs.post("/logs", (req, res, next) => {

    const { captainName } = req.body;
    const { title } = req.body;
    const { post } = req.body;
    const { mistakesWereMadeToday } = req.body;
    const { daysSinceLastCrisis } = req.body;

    logsArray.push({ captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis });

    res.send('Ok');

    next()

});


logs.delete("/logs/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (index === 0 || index >= logsArray.length) {
        res.redirect("Sorry, no data found at the index you're searching for");
    } else {
         
        res.json(logsArray.splice([index], 1));
    }
});



module.exports = logs;
