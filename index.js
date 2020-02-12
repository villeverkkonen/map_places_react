const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const bodyParser = require('body-parser')
const placesRouter = require('./controllers/places')
const mapsRouter = require('./controllers/maps')
const keywordsRouter = require('./controllers/keywords')
const config = require('./utils/config')

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  keepAlive: 1000,
  connectTimeoutMS: 30000,
  useUnifiedTopology: true
}
mongoose
  .connect(config.mongoUrl, options)
  .then(() => {
  })
  .catch(err => {
    console.log(err)
  })
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('frontend/build'))

app.use(middleware.logger)
app.use('/api/places', placesRouter)
app.use('/api/maps', mapsRouter)
app.use('/api/keywords', keywordsRouter)
app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}