const Place = require('../models/place')

const initialPlaces = [
  {
    title: 'Test1',
    description: 'Test1',
    latitude: 60,
    longitude: 25,
    openingHours: 8-16
  },
  {
    title: 'Test2',
    description: 'Test2',
    latitude: 61,
    longitude: 26,
    openingHours: 9-17
  }
]

const placesInDb = async () => {
  const places = await Place.find({})
  return places.map(Place.format)
}

const nonExistingId = async () => {
  const place = new Place()
  await place.save()
  await place.remove()

  return place._id.toString()
}

module.exports = {
  initialPlaces,
  placesInDb,
  nonExistingId
}