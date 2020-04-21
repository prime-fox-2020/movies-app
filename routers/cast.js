const router=require('express').Router()
const CastController=require('../controller/castcontroller')

router.get('/',CastController.show)
router.get('/add',CastController.add)
router.post('/add',CastController.addPost)
router.get('/seemovies/:id',CastController.seemovie)
router.get('/edit/:id',CastController.edit)
router.post('/edit/:id',CastController.editPost)
router.get('/delete/:id',CastController.delete)

module.exports=router