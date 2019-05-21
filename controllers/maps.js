const mapsRouter = require('express').Router()

mapsRouter.get('/api_key', (req, res) => {
    res.send(process.env.API_KEY)
})

module.exports = mapsRouter