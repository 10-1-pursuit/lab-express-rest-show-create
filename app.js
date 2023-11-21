const express = require("express");
const app = express();

app.use(express.json());

const logsController = require('./controllers/logs.controller');
app.use('/', logsController);


//Routes
app.get('/logs', (req, res) => {
    res.send(logs)
})

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).json({ error: " Sorry, no page found" });
  });








module.exports = app;