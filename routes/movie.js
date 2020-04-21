const router = require('express').Router()
const movieController = require('../controllers/movieController');

router.get('/', movieController.show)
router.get('/add', movieController.addGet);
router.post('/add', movieController.addPost);

router.get('/:id/edit', movieController.editGet);
router.post('/:id/edit', movieController.editPost);
router.get('/:id/question',movieController.deleteQuestion)
router.get('/:id/delete', movieController.delete);

router.get('/:id/addCast',movieController.addCastForm)

router.post('/:id/addCastToMovie', movieController.addCastToMovie)

module.exports = router
