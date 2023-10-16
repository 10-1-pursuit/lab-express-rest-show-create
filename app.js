const express = require("express");


const app = express();


app.use(express.json());

const logController = require("./controllers/logController.js");

app.use("/logs", logController);


app.get("/", (req, res) => {
    res.send("welcome to the captain's log");
});

app.get("*", (req, res) => {
    res.status(404).send("log does not exist");
});


module.exports = app;