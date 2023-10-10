const app = require('./app')

require('dotenv').config()

const {PORT} = process.env

console.log(PORT);

app.listen(PORT, () => {
    console.log('The app is listening now')
})