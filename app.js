const express = require("express");
const app = express();

const logsController = require("./controllers/logsController.js");
const shapesController = require("./");


app.use(express.json());

app.use("/logs", logsController);


