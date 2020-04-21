const express = require('express')
const router = express.Router()

const CastController = require('../controllers/CastController')

router.get('/', CastController.show)
router.get('/add', CastController.addPage)
router.post('/add', CastController.postAddPage)
router.get('/edit/:id', CastController.editPage)
router.post('/edit/:id', CastController.postEditPage)
router.get('/delete/:id', CastController.delete)
router.get('/played/:id', CastController.movieCast)

module.exports = router