const express = require("express");
const app = express();
//parse incoming middleware
const cors = require("cors");

app.use(cors
    ({origin: 'http://localhost:3000' })
    )

const logsController = require('./controllers/logsController');

app.use(express.json());

app.use('/', logsController);

app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});


module.exports = app;
