const express = require('express')
const captainData = express.Router()
const captainArray = require("../models/captain.model")


captainData.get("/", (req, res, next) => {



    res.json(`welcome to the captain's log`)

    next()
}

);

captainData.get("/logs", (req, res, next) => {



    res.json(captainArray)

    next()
}

);



captainData.get("/logs/:index", (req, res, next) => {

    const index = parseInt(req.params.index);
    if (index === 0 || index >= captainArray.length) {

        res.redirect('Sorry, no data found at the index youre searching for')

    } else {


        res.send(captainArray[index])
    }



    next()

});

captainData.post("/logs", (req, res, next) => {

    const { captainName } = req.body
    const { title } = req.body
    const { post } = req.body
    const { mistakesWereMadeToday } = req.body
    const { daysSinceLastCrisis } = req.body


    captainArray.push({ captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis })

    res.send('Ok')
    next()
})



captainData.delete("/logs/:index", (req, res, next) => {

    const index = parseInt(req.params.index);
    if (index === 0 || index >= captainArray.length) {

        res.redirect('Sorry, no data found at the index youre searching for')

    } else {


        res.json(captainArray.splice([index], 1))
    }
    next()

});


//BONUSES
captainData.get('/logs:order', (req, res) => {

    const { order } = req.query
        ;

    const sortedCaptains = [...captainArray]

    if (order === "asc") {

        // console.log(req.query.order)

        sortedCaptains.sort(function (a, b) {
            if (a.captainName.toUpperCase() < b.captainName.toUpperCase()) {


                return -1;
            }
            if (a.captainName.toUpperCase() > b.captainName.toUpperCase()) {
                return 1;
            }
            return 0;





        })
        if (sortedCaptains) {
            res.send(sortedCaptains)
        }

        // sortedCaptains.sort(function (a,b)){(a.captainName -b.captainName)}
        // res.json(value)
        // return res.send(console.log(value))
    }




})




module.exports = captainData
