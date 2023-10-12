const express = require("express");
const app = express();

// const logsController = require("./controllers/logsController.js");

app.get("/", (request, response) => {

    response.send("Hello World!");
})
app.use(express.json());

// app.use("/", logsController);



module.exports = app;