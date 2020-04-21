const router = require('express').Router();


const castController = require('../controllers/castController');

router.get('/', castController.show);
router.get('/add', castController.addGet);
router.post('/add', castController.addPost);
router.get('/:id/question', castController.deleteQuestion);
router.get('/:id/delete', castController.delete);
router.get('/:id/seeMovies', castController.seeMovies);
router.get('/:id/edit', castController.editGet)
router.post('/:id/edit', castController.editPost)


module.exports = router