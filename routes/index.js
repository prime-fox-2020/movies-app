const route = require ('express').Router();
const phroute = require ('./phroute')
const mvroute = require ('./mvroute')
const csroute = require ('./csroute')

route.get('/',(req,res)=>{
    res.send(`ini untuk movies app`)
})

module.exports = route

route.use('/ph',phroute)
route.use('/mv',mvroute)
route.use('/cs',csroute)