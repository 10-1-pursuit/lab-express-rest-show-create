const express = require("express");
const logs = express.Router();
const logArray = require('../models/log')

logs.get('/', (req,res)=>{
  res.send(logArray)  
})


logs.get('/:id', (req, res)=>{
    const {id} = req.params;
    if(logArray[id]){
    res.send(logArray[id])
  }else{
    res.status(303).send('Not Found')
  }
  });


logs.post('/', (req, res)=>{
    const {captainName,daysSinceLastCrisis,mistakesWereMadeToday,post,title} = req.body;
    logArray.push({captainName,daysSinceLastCrisis,mistakesWereMadeToday,post,title})
    res.send(logArray)
    })
    
logs.delete('/:id', (req,res)=>{
const{id} = req.params;
if(logArray[id]){
    logArray.splice(id,1);
}
    res.send(logArray)
})
module.exports = logs