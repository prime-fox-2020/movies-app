const routers = require('express').Router()
const prodHouseRouter = require('../routers/prodHouse')
const movieRouter = require('../routers/movie')

// routers.get('/', (req,res)=>{
//     res.send('ada di router/index.js')
// })
routers.get('/', (req,res)=>{
    res.render('home')
})
routers.use('/prodHouse', prodHouseRouter)
routers.use('/movie', movieRouter)


module.exports = routers