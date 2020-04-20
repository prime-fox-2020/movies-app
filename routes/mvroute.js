const route = require('express').Router()
const controller = require('../controllers/mvcontroller.js')

route.get('/',
// (req,res)=>{
//     res.send('uda di MV nih')
// })
controller.findAll)
route.get('/:id/edit/',controller.editForm)
route.post('/:id/edit/',controller.editMovie)
route.get('/:id/delete/',controller.destroyMovie)
route.get('/add',controller.createMovie)
route.post('/add',controller.addMovie)


module.exports = route