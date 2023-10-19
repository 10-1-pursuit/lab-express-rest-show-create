const express = require("express");
const logsArray = require("../models/log.js");
const router = express.Router();

// Define your routes using router.get(), router.post(), etc.
//get all
router.get("/", (req, res) => {
  res.json(logsArray);
});

//BONUS: Filtered Routes --------
router.get("/", (req, res) => {
  res.json(logsArray);

  //mistakes ----
  router.get("/", (req, res) => {
    let filteredLogs = [...logsArray];

    const { mistakes, lastCrisis, order } = req.query;

    if (mistakes === "true") {
      filteredLogs = filteredLogs.filter((log) => log.mistakesWereMadeToday);
    } else if (mistakes === "false") {
      filteredLogs = filteredLogs.filter((log) => !log.mistakesWereMadeToday);
    }
    // last crisis ----
    if (lastCrisis === "gt10") {
      filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis > 10);
    } else if (lastCrisis === "gte20") {
      filteredLogs = filteredLogs.filter(
        (log) => log.daysSinceLastCrisis >= 20
      );
    } else if (lastCrisis) {
      filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis <= 5);
    }

    // sort asc or desc
    if (order === "asc") {
      filteredLogs = filteredLogs.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (order === "desc") {
      filteredLogs = filteredLogs.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }
  });
  res.json(filteredLogs);
});
//--------------------- RESTful routes -------------------

//get one
router.get("/:index", (req, res) => {
  const { index } = req.params;
  const log = logsArray[index];
  if (log) {
    res.json(log);
  } else {
    res.redirect("logs");
  }
});

//create
router.post("/", (req, res) => {
  const newLog = req.body;
  logsArray.push(newLog);
  res.send("done successfully");
});

//update
router.put("/:index", (req, res) => {
  const { index } = req.params;
  const updatedLog = req.body;
  logsArray[index] = updatedLog;
  res.redirect(`/logs/${index}`);
});

//delete
router.delete("/:index", (req, res) => {
  const { index } = req.params;
  const deletedLog = logsArray.splice(index, 1)[0];

  if (deletedLog) {
    res.status(303).redirect("/logs");
  } else {
    res.status(404).send("not found");
  }
});

module.exports = router;
