const express = require('express')
const router = express.Router()

const ProdController = require('../controllers/prodController')

router.get('/', ProdController.show)

module.exports = router