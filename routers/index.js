const router=require('express').Router()
const ProductionHouse=require('./productionHouse')
const Movie=require('./movie')
const HomeController=require('../controller/homecontroller')

router.use('/productionhouses',ProductionHouse)
router.use('/movies',Movie)

router.get('/',HomeController.show)

module.exports=router