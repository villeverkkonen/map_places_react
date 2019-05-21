const mapsRouter = require('express').Router()

mapsRouter.get('/api_key', (req, res) => {
    console.log("apiKey: " + process.env.API_KEY)
    res.send(process.env.API_KEY)
})

module.exports = mapsRouter