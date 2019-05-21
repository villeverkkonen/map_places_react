const placesRouter = require('express').Router()
const Place = require('../models/place')
const Keyword = require('../models/keyword')

// Get all places
placesRouter.get('/', async (req, res) => {
    try {
        const places = await Place
            .find({})
            .populate('keywords', { title: 1 })

        if (places) {
            res.json(places.map(Place.format))
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

// Get one place
placesRouter.get('/:id', async (req, res) => {
    try {
        const place = await Place
            .findById(req.params.id)
            .populate('keywords', { title: 1 })

        if (place) {
            res.json(Place.format(place))
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

// Add place
placesRouter.post('/', async (req, res) => {
    try {
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

        const savedPlace = await place.save()
        savedPlace.populate('keywords', { title: 1 }).execPopulate()

        if (savedPlace) {
            res.json(Place.format(savedPlace))
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

// Delete place
placesRouter.delete('/:id', async (req, res) => {
    try {
        await Place
            .findById(req.params.id)
            .then(place => {
                // Delete keywords for this place
                place.keywords.map(async keywordId => {
                    await Keyword.findByIdAndRemove(keywordId)
                })
                Place
                    .findByIdAndRemove(req.params.id)
                    .then(response  => {
                        res.status(204).end()
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(400).send({ error: 'malformatted id'})
                    })
            })
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    } 
})

// Update place
placesRouter.put('/:id', async (req, res) => {
    try {
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

        const updatedPlace = await Place
            .findByIdAndUpdate(req.params.id, place, { new: true })
            .populate('keywords', { title: 1 })

        if (updatedPlace) {
            res.json(Place.format(updatedPlace))
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    } 
})

module.exports = placesRouter