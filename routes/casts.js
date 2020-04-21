const router = require('express').Router()
const CastController = require('../controllers/cast')

router.get('/', CastController.showAll)
router.get('/add', CastController.showForm)
router.post('/add', CastController.addProcess)
router.get('/delete/:id', CastController.deleteProcess)
router.get('/edit/:id', CastController.showEdit)
router.post('/edit/:id', CastController.editProcess)

module.exports = router