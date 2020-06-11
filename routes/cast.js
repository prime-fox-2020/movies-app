const express = require('express');
const CastController = require('../controllers/CastController')
const router = express.Router();

router.get('/', CastController.get);
router.get('/add', CastController.add);
router.post('/add', CastController.addPost);
router.get('/edit/:id', CastController.edit);
router.post('/edit/:id', CastController.editPost);
router.get('/delete/:id', CastController.delete);
router.get('/seeMovie/:id', CastController.seeMovie);

module.exports = router;