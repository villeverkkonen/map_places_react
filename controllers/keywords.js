const keywordsRouter = require('express').Router()
const Keyword = require('../models/keyword')

// Get all keywords
keywordsRouter.get('/', (req, res) => {
    Keyword
        .find({})
        .then(keywords => {
            res.json(keywords.map(formatKeyword))
        })
})

// Get one keyword
keywordsRouter.get('/:id', (req, res) => {
    Keyword
        .findById(req.params.id)
        .then(keyword => {
            if (keyword) {
                res.json(formatKeyword(keyword))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
          })
})

// Add keyword
keywordsRouter.post('/', (req, res) => {
    const body = req.body
    if (body.title === undefined) {
        return res.status(400).json({error: 'title missing'})
    }

    const keyword = new Keyword({
        title: body.title,
        place: body.place
    })

    keyword
        .save()
        .then(savedKeyword => {
            res.json(formatKeyword(savedKeyword))
          })
})

// Delete keyword
keywordsRouter.delete('/:id', (req, res) => {
    Keyword
        .findByIdAndRemove(req.params.id)
        .then(result  => {
            res.status(204).end()
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id'})
        })
})

// Update keyword
keywordsRouter.put('/:id', (req, res) => {
    const body = req.body
    if (body.title === undefined) {
        return res.status(400).json({error: 'title missing'})
    }

    const keyword = {
        title: body.title
    }

    Keyword
        .findByIdAndUpdate(req.params.id, keyword, { new: true })
        .then(updatedKeyword => {
            res.json(formatKeyword(updatedKeyword))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

const formatKeyword = (keyword) => {
    return {
        title: keyword.title,
        id: keyword._id,
        place: keyword.placeId
      }
  }

module.exports = keywordsRouter