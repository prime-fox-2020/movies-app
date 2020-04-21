const express = require('express')
const router = express.Router()

const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.show)
router.get('/add', MovieController.addPage)
router.post('/add', MovieController.postAddPage)
router.get('/edit/:id', MovieController.editPage)
router.post('/edit/:id', MovieController.postEditPage)
router.get('/delete/:id', MovieController.delete)
router.get('/addCast/:id', MovieController.addCast)
router.post('/addCast/:id', MovieController.postAddCast)

module.exports = router