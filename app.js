const express = require('express');
const app = express();
const PORT = 8080;
const captainController = require('./controllers/captain.controller');
app.use(express.json());


app.use('/', captainController);
app.use('/logs',captainController); 
app.get('*', (req, res) => {
    res.status(404).json({ error: 'Woopsies!' });
  });

app.listen(PORT, () => {
  console.log('The app is listening on PORT ', PORT);
});

module.exports = app;
