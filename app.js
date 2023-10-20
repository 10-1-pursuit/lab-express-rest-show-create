//DEPENDENCIES
const express = require("express");
const app = express();
const cors = require('cors')

//CONTROLLERS
const logs_controller = require('./controllers/logs_controller')

//Middleware:
app.use(cors()) // permissions cross origin resource sharing
app.use(express.json()) // get post requests parse incoming 

app.use('/logs', logs_controller);

app.use((req, res) => {
    console.log(req.method, req.headers.host, req.path)

})

app.get('/', (req, res) =>{
  res.status(200).send("welcome to the captain's log")
})

app.get('*', (req, res) => {
    res.status(404).json({error:"me no work here"})
})

module.exports = app;