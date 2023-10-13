// DEPENDENCIES
const express = require("express");
const app = express();

const logController = require("./controllers/logController")
// CONFIGURATION
app.use("/",logController)
// ROUTES
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi,there all");
});

app.use("*", (req, res) => {
    res.status(404).send("sorry, the page you requested cannot be found");
});

// EXPORT
module.exports = app;
