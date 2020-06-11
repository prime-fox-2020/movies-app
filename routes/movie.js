const express = require('express');
const MovieController = require('../controllers/MovieController')
const router = express.Router();

router.get('/', MovieController.get);
router.get('/add', MovieController.add);
router.post('/add', MovieController.addPost);
router.get('/edit/:id', MovieController.edit);
router.post('/edit/:id', MovieController.editPost);
router.get('/delete/:id', MovieController.delete);
router.get('/addCast/:id', MovieController.addCast);
router.post('/addCast/:id', MovieController.addCastPost);

module.exports = router;