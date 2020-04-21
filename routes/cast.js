const router = require('express').Router();
const Controller = require('../controllers/cast');

router.get('/', Controller.showData);
router.get('/add', Controller.addData);
router.post('/add', Controller.addPost);
router.get('/edit/:id', Controller.editData);
router.post('/edit/:id', Controller.editPost);
router.get('/delete/:id', Controller.delete);

module.exports = router;