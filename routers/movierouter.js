const express = require('express')
const router = express.Router()

const MovieController = require('../controllers/moviecontroller')

router.get('/', MovieController.show)
router.get('/add', MovieController.showAdd)
router.post('/add', MovieController.add)
router.get('/edit/:id', MovieController.showEdit)
router.post('/edit/:id', MovieController.edit)
router.get('/delete/:id', MovieController.delete)

module.exports = router