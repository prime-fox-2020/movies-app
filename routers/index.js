const routers = require('express').Router()
const prodHouseRouter = require('../routers/prodHouse')
const movieRouter = require('../routers/movie')
const castRouter = require('../routers/cast')

// routers.get('/', (req,res)=>{
//     res.send('ada di router/index.js')
// })
routers.get('/', (req,res)=>{
    res.render('home')
})
routers.use('/prodHouse', prodHouseRouter)
routers.use('/movie', movieRouter)
routers.use('/cast', castRouter)


module.exports = routers