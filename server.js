console.log("Test")
const app = require("./app.js")

require("dotenv").config();
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`I'm at listening at PORT: ${PORT}💅🏾`)
})