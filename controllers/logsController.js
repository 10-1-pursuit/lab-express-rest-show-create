const express = require("express");
const router = express.Router();
const logsArray = require("../models/log");

// get - log
router.get("/", (req, res) => {
  res.status(200).json(logsArray);
});

// get - indiv log
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id < 0 || id > logsArray.length) {
    res.redirect("/logs");
  } else {
    res.status(200).json(logsArray[id]);
  }
});

// post - create
router.post("/", (req, res) => {
  const newLog = req.body;
  if (!newLog) {
    res.redirect("/logs");
  } else {
    logsArray.push(newLog);
    res.status(201).json(logsArray[logsArray.length - 1]);
  }
});

// delete
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id < 0 || id > logsArray.length) {
    res.redirect("/logs");
  } else {
    logsArray.splice(id, 1);
    res.status(204).json(logsArray);
  }
});

// put - update
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id < 0 || id > logsArray.length) {
    res.redirect("/logs");
  } else {
    logsArray.splice(id, 1, req.body);
    res.status(200).json(logsArray);
  }
});

// export
module.exports = router;
