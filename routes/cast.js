const router = require('express').Router()
const castControl = require('../controller/cast')

router.get('/', castControl.getHome)
router.get('/addCast', castControl.add)
router.post('/addCast', castControl.postAdd)
router.get('/:id/edit', castControl.edit)
router.post('/:id/edit', castControl.postEdit)
router.get('/:id/seeMovies', castControl.seeMovies)
router.get('/:id/delete', castControl.delete)

module.exports = router