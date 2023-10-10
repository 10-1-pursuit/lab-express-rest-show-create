const express=require('express')
const app=express()

const captainController=require("./controllers/captianController")

app.use("/",captainController)

app.get('*', (req, res) => {
    res.status(404).json({ error: 'DOES NOT EXIST' });
  });






module.exports=app
