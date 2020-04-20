const router = require('express').Router()
const phController = require('../controllers/prodHouseController');

router.get('/', phController.show)



module.exports = router
