const express = require("express");
const cors = require("cors");
const app = express();
const captainLogsController = require("./controllers/captainlogscontroller.js");

app.use(cors());

app.use(express.json());
app.use("/logs", captainLogsController);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the captain's log!")
});

app.use("*", (req, res) => {
    res.status(404).json({ error: "Page doesn't exist!" })
})

module.exports = app