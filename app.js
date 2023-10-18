const express = require("express");
const app = express();
const cors = require("cors");
const logsController = require("./controllers/logsController.js");


app.use(cors({ origin: "http://localhost:5050/" }));
app.use(express.json());



app.use("/", logsController)
app.get("/", (request, response) => {

    response.send("Hello World!");
})

// app.use("/", logsController);



module.exports = app;