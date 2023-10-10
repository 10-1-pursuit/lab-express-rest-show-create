const express=require('express')
const captainData=express.Router()
const captainArray=require("../models/captain.model")

captainData.get("/logs",(req,res)=>{


res.json(captainArray)

})

module.exports=captainData
