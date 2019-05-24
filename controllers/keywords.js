const keywordsRouter = require('express').Router()
const Keyword = require('../models/keyword')
const Place = require('../models/place')

// Get all keywords
keywordsRouter.get('/', async (req, res) => {
    try {
        const keywords = await Keyword
            .find({})
            .populate('place', { title: 1, description: 1, latitude: 1, longitude: 1, openingHours: 1 })
        
        if (keywords) {
            res.json(keywords.map(Keyword.format))
        } else {
            res.status(404).end()
        }
        
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

// Get one keyword
keywordsRouter.get('/:id', async (req, res) => {
    try {
        const keyword = await Keyword
            .findById(req.params.id)
            .populate('place', { title: 1, description: 1, latitude: 1, longitude: 1, openingHours: 1 })

        if (keyword) {
            res.json(Keyword.format(keyword))
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

// Add keyword
keywordsRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        if (body.title === undefined) {
            return res.status(400).json({error: 'title missing'})
        }

        const place = await Place.findById(body.placeId)

        const keyword = new Keyword({
            title: body.title,
            place: place._id
        })

        const savedKeyword = await keyword.save()
        savedKeyword.populate('place', { title: 1, description: 1, latitude: 1, longitude: 1, openingHours: 1, keywords: 1 }).execPopulate()

        place.keywords = place.keywords.concat(savedKeyword._id)
        await place.save()

        if (savedKeyword) {
            res.json(Keyword.format(savedKeyword))
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

// Delete keyword
keywordsRouter.delete('/:id/:placeId', async (req, res) => {
    await Keyword.findByIdAndRemove(req.params.id)
        .then(async result => {
            const place = await Place.findById(req.params.placeId)
            place.keywords = place.keywords.filter(keyword => keyword.toString() !== req.params.id.toString())
            await place.save()

            res.status(204).end()
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id'})
        })
})

// Update keyword
keywordsRouter.put('/:id', async (req, res) => {
    try {
        const body = req.body
        if (body.title === undefined) {
            return res.status(400).json({error: 'title missing'})
        }

        const keyword = {
            title: body.title
        }

        const updatedKeyword = await Keyword
            .findByIdAndUpdate(req.params.id, keyword, { new: true })
            .populate('place', { title: 1, description: 1, latitude: 1, longitude: 1, openingHours: 1, keywords: 1 })
        
        if (updatedKeyword) {
            res.json(Keyword.format(updatedKeyword))
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = keywordsRouter