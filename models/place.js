const mongoose = require('mongoose')

const Place = mongoose.model('Place', {
    title: String,
    description: String,
    latitude: String,
    longitude: String,
    openingHours: String,
    keywords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' }]
  })

module.exports = Place