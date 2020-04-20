const router = require('express').Router();
const Controller = require('../controllers/prodHouse');

router.get('/', Controller.showData);

module.exports = router;