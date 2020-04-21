const route = require('express').Router()
const mvController = require('../controllers/mv.js');
const phController = require('../controllers/ph.js');

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
route.get('/mv/:id/edit/',mvController.editForm)
route.post('/mv/:id/edit/',mvController.changeMovie)
route.get('/mv/:id/delete/',mvController.destroyMovie)
route.get('/mv/add',mvController.createMovie)
route.post('/mv/add',mvController.addMovie)

route.get('/ph',cekLogin,phController.findAll)
// route.get('/ph/:id/edit/',phController.editForm)
// route.post('/ph/:id/edit/',phController.editMovie)
// route.get('/ph/:id/delete/',phController.destroyMovie)
// route.get('/ph/add',phController.createMovie)
// route.post('/ph/add',phController.addMovie)
route.get()





module.exports=route