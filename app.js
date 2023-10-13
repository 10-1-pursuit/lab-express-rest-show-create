const express = require("express");
const app = express();
app.use(express.json());

const logsController = require("./controllers/logsController.js");

app.use("/", logsController)
app.get("/", (request, response) => {

    response.send("Hello World!");
})

// app.use("/", logsController);



module.exports = app;