const express = require('express');
const app = express();

const logsController = require('./controllers/logsController.js')

app.use(express.json());

app.use('/logs', logsController);

app.get('/', (req, res)=>{
  res.send("Welcome to the captains's log!!!")
})

app.get('*', (req, res) => {
    res.status(404).json({ error: "Page does not exist!!" });
  });


module.exports = app;

