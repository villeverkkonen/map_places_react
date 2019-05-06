const mapsRouter = require('express').Router()

mapsRouter.get('/api_key', (request, response) => {
    response.send(process.env.API_KEY)
})

module.exports = mapsRouter