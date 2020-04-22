const route = require('express').Router()
const mvController = require('../controllers/mv.js');
const phController = require('../controllers/ph.js');
const csController = require('../controllers/cs.js')

route.get('/',(req,res)=>{
    res.render('home')
})

const cekLogin = function (req, res, next){
    if(!req.session.user){
      console.log(err)
      res.redirect('/login')
    } else {
      next()
    }
  }

route.get('/mv',mvController.findAll)
route.get('/mv/:id/edit/',mvController.edit)
route.post('/mv/:id/edit/',mvController.change)
route.get('/mv/:id/delete/',mvController.destroy)
route.get('/mv/add',mvController.create)
route.post('/mv/add',mvController.add)
route.get('/mv/:id/addcast',mvController.mvcreatecast)
route.post('/mv/:id/addcast',mvController.mvaddcast)



route.get('/ph',phController.findAll)
// route.get('/ph/:id/edit/',phController.editForm)
// route.post('/ph/:id/edit/',phController.editMovie)
// route.get('/ph/:id/delete/',phController.destroyMovie)
// route.get('/ph/add',phController.createMovie)
// route.post('/ph/add',phController.addMovie)



route.get('/cs',csController.findAll)
route.get('/cs/:id/edit/',csController.edit)
route.post('/cs/:id/edit/',csController.change)
route.get('/cs/:id/delete/',csController.destroy)
route.get('/cs/:id/seemovies/',csController.seemovies)
route.get('/cs/add',csController.create)
route.post('/cs/add',csController.add)



module.exports=route