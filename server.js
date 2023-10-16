const app = require('./app.js');
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:3000' 
}))

require('dotenv').config();
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('The app is listening on PORT ', PORT);
});