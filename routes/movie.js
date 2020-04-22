const router = require('express').Router()
const movieControl = require('../controller/movie')

router.get('/', movieControl.getList)
router.get('/addMovie', movieControl.add)
router.post('/addMovie', movieControl.postAdd)
router.get('/editMovie/:id', movieControl.edit)
router.post('/editMovie/:id', movieControl.postEdit)
router.get('/delete/:id', movieControl.delete)
router.get('/:id/addCast', movieControl.addCast)
router.post('/:id/addCast', movieControl.postAddCast)


module.exports = router