const express = require('express')
const router = express.Router()

const CastController = require('../controllers/castController')

router.get('/', CastController.show)
router.get('/add', CastController.addForm)
router.post('/add', CastController.add)
router.get('/:id/edit', CastController.editForm)
router.post('/:id/edit', CastController.edit)
router.get('/:id/delete', CastController.delete)
router.get('/:id/seeMovies', CastController.seeMovie)

module.exports = router