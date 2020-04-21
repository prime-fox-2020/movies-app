const express = require('express')
const router = express.Router()

const MovieController = require('../controllers/movieController')

router.get('/', MovieController.show)
router.get('/add', MovieController.addForm)
router.post('/add', MovieController.add)
router.get('/:id/edit', MovieController.editForm)
router.post('/:id/edit', MovieController.edit)
router.get('/:id/delete', MovieController.delete)
router.get('/:id/addcast', MovieController.addCastForm)
router.post('/:id/addcast', MovieController.addCast)


module.exports = router