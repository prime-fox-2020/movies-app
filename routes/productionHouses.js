const express = require('express')
const phController = require('../controllers/phController')

const router = express.Router()

router.get('/', phController.getProductionHouses)


module.exports = router