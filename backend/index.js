const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const bodyParser = require('body-parser')
const placesRouter = require('./controllers/places')
const mapsRouter = require('./controllers/maps')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    keepAlive: 1000,
    connectTimeoutMS: 30000,
    reconnectTries: 30,
    reconnectInterval: 2000
}
mongoose.connect(process.env.MONGODB_URI, options)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'backend/build')))

app.use(middleware.logger)
app.use('/api/places', placesRouter)
app.use('/api/maps', mapsRouter)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'backend/build/index.html'))
})
app.use(middleware.error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})