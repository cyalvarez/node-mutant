const express = require('express')
const router = express.Router()

const dnaController = require('../controllers/dna.controller')

router.post('/', dnaController.postMutant)
router.get('/stats', dnaController.getStats)

module.exports = router