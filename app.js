const express = require('express');
const app = express();
const logsController = require('./controllers/logsController')
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:3000' 
}))
console.log('app test')

app.use(express.json())
app.use('/logs', logsController)

app.get('/', (req, res) => {
    res.send("welcome to the captain's log");
})

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Self destruct imminent!' });
})

module.exports = app;