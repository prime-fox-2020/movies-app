const router = require('express').Router()

const prodHouseRouter = require('./prodHouse')
const movieRouter = require('./movies')
const castRouter = require('./cast')

router.use('/casts', castRouter)
router.use('/movies', movieRouter)
router.use('/prodHouses', prodHouseRouter)

router.get('/', (req, res) => {
    res.render('home.ejs')
})

module.exports = router