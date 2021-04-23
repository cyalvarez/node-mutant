const mongoose = require('mongoose')

const MutantSchema = mongoose.Schema({
  dna: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Mutant', MutantSchema)