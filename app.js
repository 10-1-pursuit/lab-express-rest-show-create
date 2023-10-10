const express = require("express");
const app = express();

const colorsController = require("./");
const shapesController = require("./");


app.use(express.json());

app.use("/colors", colorsController)
app.use()