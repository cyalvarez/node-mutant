const express = require('express')
const router = express.Router()

const mutantController = require('../controllers/mutant.controller')

router.get('/', mutantController.getMutant)

module.exports = router