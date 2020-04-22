const express = require('express')
const router = express.Router()

const CastController = require('../controllers/castcontroller')

router.get('/', CastController.show)
router.get('/add', CastController.showAdd)
router.post('/add', CastController.add)
router.get('/edit/:id', CastController.showEdit)
router.post('/edit/:id', CastController.edit)
router.get('/delete/:id', CastController.delete)

module.exports = router