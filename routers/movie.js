const router=require('express').Router()
const MovieController=require('../controller/moviecontroller')

router.get('/',MovieController.show)
router.get('/add',MovieController.addForm)
router.post('/add',MovieController.addPost)
router.get('/edit/:id',MovieController.edit)
router.post('/edit/:id',MovieController.editPost)
router.get('/delete/:id',MovieController.delete)

module.exports=router