
const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.status(200).send("Hello, world!");
});

// Routes
const logsController = require("./controllers/logs.controller");

app.use(logsController);

// 404 route
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// app.all("*", (req, res) => {
//     if (req.url === "/") {
//         res.send("Hello, world!");
//     } else {
//         res.status(404).send("Not Found");
//     }
// });


module.exports = app;