//Dependencies
const app = require("./app.js");

//configuration
require("dotenv").config();
const PORT = process.env.PORT || 3333;

//listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
