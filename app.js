const express = require('express')
const logs = require("./models/log.js");
const app = express()
//parse incoming middleware
app.use(express.json()) 


app.get('/', (req, res) => {
    res.send("Welcome to the Captain's Log, Ayee Matey 🪝⛵️")
})

app.get('/logs', (req, res) => {
    res.send(logs)
})

app.get('/logs/:arrayIndex', (req, res) => {
    const {arrayIndex} = req.params
    if(logs[arrayIndex]) {
        res.json(logs[arrayIndex])
    // console.log("excuse", logs[arrayIndex])
    } else 
    res.redirect( 'https://github.com/joinpursuit/captains-log-api' )
})

app.post('/logs', (req, res) => {
    const { captainName,
        title,
        post,
        mistakesWereMadeToday,
        daysSinceLastCrisis
    } = req.body;
    const newLog = req.body
    console.log(`sent, ${JSON.stringify(newLog)}`);
    logs.push(newLog)
    res.status(201).json(newLog)
    
})

app.delete('/logs/:id', (req, res) => {
    const {id} = req.params
    logs.splice(id, 1)
    res.send('Ok')
})



const alphaOrder = (req, res, next) => {
console.log('✅')


if (req.body.hasOwnProperty('name')){
    return next();
} else {
    res.send('uh oh')
}

}

app.post('/', alphaOrder, (req, res) => {
    const sortedLog = Object.keys(logs).sort()
    console.log('sent')
    logs.push(sortedLog)
    res.send('Ok')
})



app.get('/logs?order=asc', (req, res) => {

})



app.all('*', (req, res) => { 
    res.status(404).send('<h1>404! Page not found</h1>'); 
  }); 

//   app.use((req, res, next) => {
//     console.log(req.method, req.headers.host, req.path)
//     if (req.body.userName === 'Gary') {
//     return next()
// } else {
// return res.status(403).send('no no no ')
// }
// })
// app.post()
// app.delete()

module.exports = app