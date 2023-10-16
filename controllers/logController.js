const express = require("express");

const logs = express.Router();

const logArray = require("../models/log.js");




logs.get("/", (req, res) => {
    res.send(logArray);
});

logs.get("/:id", (req, res) => {
    const {id} = req.params;
    if(logArray[id]){
    res.send(logArray[id]);
    } else {
      res.redirect("/*");
    }
  
});

logs.post("/", (req, res) => {
    logArray.push(req.body);
     res.send("post");
});

logs.put("/:id", (req, res) => {
    const {id} = req.params;
    logArray[id] = req.body;
    res.send("put id");

});

logs.delete("/:id", (req, res) => {
    const {id} = req.params;
    (logArray.splice(id, 1));
      res.send("delete id");
});


module.exports = logs;