// dependencies
const app = require("./app.js");

// config
require("dotenv").config();
const PORT = process.env.PORT;

// listen
app.listen(PORT, () => {
  console.log(`Listeningon port ${PORT}`);
});
