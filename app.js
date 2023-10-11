//DEPEND
const express = require("express");
const app = express();

//CONTROLLERS
const logs_controller = require('./controllers/logs_controller')


//Middleware:
app.use(express.json()) // get post requests

app.use('/logs', logs_controller);

app.use((req, res, next) => {
    console.log(req.method, req.headers.host, req.path)
   return next()
})

app.get('/', (req, res) =>{
  res.status(200).send("welcome to the captain's log")
})

app.get('*', (req, res) => {
    res.status(404).json({error:"me no work here"})
})

module.exports = app;