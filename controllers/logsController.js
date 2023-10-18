const express = require("express");
const logs = express.Router();
const logsArray = require("../models/captainQuotes");


//Index Route

logs.get("/", (request, response) => {
    response.json("Welcome to the Captain's Log!")

});

logs.get("/logs", (request, response, next) => {

    response.json(logsArray);
    next()
});

logs.get("/logs/:index", (request, response, next) => {

    const index = parseInt(request.params.index);

    if (index === 0 || index >= logsArray.length) {
        response.redirect("Sorry, no data found the index you're searching for")

    } else {

        response.send(logsArray[index])
    }

    next();
});






// const checkForLogKey = (request, response, next) => {
//     console.log('Check');
//     if (req.body.hasOwnProperty('CaptainName', 'title', 'post', 'mistakesWereMadeToday', 'daysSinceLastCrisis')) {
//         return next();
//     } else {
//         response.send('You must supply an object with a key of `name`');
//     }
// };

// CREATE ROUTE! Creates a new resource on the server.
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

        res.redirect("Sorry, no data found at the index you're searching for")

    } else {

        res.json(logsArray.splice([index], 1));
    }
});






module.exports = logs;
