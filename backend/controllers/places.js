const placesRouter = require('express').Router()
const Place = require('../models/place')

// Get all places
placesRouter.get('/', (req, res) => {
    Place
        .find({})
        .then(places => {
            res.json(places.map(formatPlace))
        })
})

// Get one place
placesRouter.get('/:id', (req, res) => {
    Place
        .findById(req.params.id)
        .then(place => {
            if (place) {
                res.json(formatPlace(place))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
          })
})

// Add place
placesRouter.post('/', (req, res) => {
    const body = req.body
    if (body.title === undefined) {
        return res.status(400).json({error: 'title missing'})
    }

    const place = new Place({
        title: body.title,
        description: body.description,
        latitude: body.latitude,
        longitude: body.longitude,
        openingHours: body.openingHours
    })

    place
        .save()
        .then(savedPlace => {
            res.json(formatPlace(savedPlace))
          })
})

// Delete place
placesRouter.delete('/:id', (req, res) => {
    Place
        .findOneAndRemove(req.params.id)
        .then(result  => {
            res.status(204).end()
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id'})
        })
})

// Update place
placesRouter.put('/:id', (req, res) => {
    const body = req.body
    if (body.title === undefined) {
        return res.status(400).json({error: 'title missing'})
    }

    const place = {
        title: body.title,
        description: body.description,
        latitude: body.latitude,
        longitude: body.longitude,
        openingHours: body.openingHours
    }

    Place
        .findByIdAndUpdate(req.params.id, place, { new: true })
        .then(updatedPlace => {
            res.json(formatPlace(updatedPlace))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

const formatPlace = (place) => {
    return {
        title: place.title,
        description: place.description,
        latitude: place.latitude,
        longitude: place.longitude,
        openingHours: place.openingHours,
        id: place._id
      }
  }

module.exports = placesRouter