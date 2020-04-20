'use strict'
const { ProductionHouse } = require('../models')

class ProductionHousesController{
  static getProdHouses(req, res){
    ProductionHouse.findAll({
      order: [['name_prodHouse', 'ASC']]
    })
      .then(prodHouses => res.render('productionHouses', {prodHouses}))
      .catch(error => res.send(error))
  }
}

module.exports = ProductionHousesController