const mongoose = require('mongoose')

const HumanSchema = mongoose.Schema({
  dna: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Human', HumanSchema)