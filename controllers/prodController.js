const {ProductionHouse} = require('../models')

class ProductionController{
  static show(req,res){
    ProductionHouse.findAll()
    .then(data=>{
      res.render('productionhouse',{data})
    })
    .catch(err=>{
      res.send(err)
    })
  }
}

module.exports = ProductionController