const express = require('express');
const captainRouter = express.Router();
const captainArray = require('../models/captain.model')


captainRouter.get('/', (req, res) => {
  res.json("Welcome to the captain's log");
});

captainRouter.get('/logs', (req,res, next) =>{
    res.json(captainArray)
})



module.exports = captainRouter;
