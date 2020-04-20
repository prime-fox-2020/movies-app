const router = require('express').Router();
const Controller = require('../controllers/prodHouse');

router.get('/', Controller.showData);
router.get('/*', Controller.notFound);

module.exports = router;