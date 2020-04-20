const route = require('express').Router()
const controller = require('../controllers/cscontroller.js')

route.get('/',
// (req,res)=>{
//     res.send('uda di MV nih')
// })
controller.findAll)
route.get('/:id/edit/',controller.editForm)
// route.post('/:id/edit/',controller.editCast)
route.get('/:id/delete/',controller.destroyCast)
route.get('/add',controller.createCast)
route.post('/add',controller.addCast)


module.exports = route