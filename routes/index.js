const router = require('express').Router();
const Controller = require('../controllers/home');
const prodHouse = require('./prodHouse');

router.get('/', Controller.homePage);
router.use('/prodHouses', prodHouse);
router.get('/*', Controller.notFound);

module.exports = router;