const express = require('express');
const app = express();

const logsController = require("./controllers/logsController")

app.use(express.json());
app.use("/logs", logsController)

app.get('*', (req, res) => {
    res.status(303).json({ error: 'Sorry, page not found!' });
  });

module.exports = app