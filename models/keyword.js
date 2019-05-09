const mongoose = require('mongoose')

const Keyword = mongoose.model('Keyword', {
    title: String,
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }
  })

module.exports = Keyword