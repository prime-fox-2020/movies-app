const { ProductionHouse } = require('../models')

class PhController {

  static getProductionHouses(req, res){
    ProductionHouse.findAll()
    .then(data=>{
      res.render('productionHouses', {data})
    }).catch(error=>{
      res.render('error', {error})      
    })
  }

}

module.exports = PhController