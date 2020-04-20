const router=require('express').Router()
const ProductionController=require('../controller/productioncontroller')

router.get('/',ProductionController.show)

module.exports=router