const mongoose = require('mongoose')

const keywordSchema = new mongoose.Schema({
  title: String,
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
})

keywordSchema.statics.format = keyword => {
  return {
    id: keyword._id,
    title: keyword.title,
    place: keyword.place,
  }
}

const Keyword = mongoose.model('Keyword', keywordSchema)

module.exports = Keyword
