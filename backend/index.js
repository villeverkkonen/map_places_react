const express = require('express')
const app = express()
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.use(cors())

app.get('/api_key', (request, response) => {
    response.send(process.env.API_KEY)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})