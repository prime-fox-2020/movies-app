const express = require('express');
const ProductionController = require('../controllers/ProductionController')
const router = express.Router();

router.get('/', ProductionController.get);

module.exports = router;