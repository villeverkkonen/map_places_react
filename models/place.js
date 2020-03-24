const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
  title: String,
  description: String,
  latitude: String,
  longitude: String,
  openingHours: String,
  keywords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' }],
})

placeSchema.statics.format = place => {
  return {
    id: place.id,
    title: place.title,
    description: place.description,
    latitude: place.latitude,
    longitude: place.longitude,
    openingHours: place.openingHours,
    keywords: place.keywords,
  }
}

const Place = mongoose.model('Place', placeSchema)

module.exports = Place
