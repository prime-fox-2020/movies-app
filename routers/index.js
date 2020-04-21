const router=require('express').Router()
const ProductionHouse=require('./productionHouse')
const Movie=require('./movie')
const Cast=require('./cast')
const HomeController=require('../controller/homecontroller')

router.use('/productionhouses',ProductionHouse)
router.use('/movies',Movie)
router.use('/casts',Cast)

router.get('/',HomeController.show)

module.exports=router