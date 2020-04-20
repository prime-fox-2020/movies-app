const router = require('express').Router();
const Controller = require('../controllers/movie');

router.get('/', Controller.showData);
router.get('/add', Controller.addData);
router.post('/add', Controller.postData);
router.get('/edit/:id', Controller.editData);
router.post('/edit/:id', Controller.postData);
router.get('/delete/:id', Controller.delete);

module.exports = router;