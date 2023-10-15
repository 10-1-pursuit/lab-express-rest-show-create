const express = require("express");
const app = express();
const cors = require("cors");
 const logsController = require("./controllers/logsController.js");

app.use(express.json());
app.use(cors());

app.use((request, response, next) => {
  next();
 });
app.get("/", (request, response) => {
  response.send("Welcome to the Captains's Log");
});

 app.use("/logs", logsController);

 app.get("*", (request, response) => {
//   response.status(404).json({ error: "page not found" });
 });
module.exports = app;
