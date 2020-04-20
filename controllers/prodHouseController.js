const PH = require('../models').ProductionHouse


class ProductionHouseController{
  static show(req,res){
    PH.findAll({order:[['name_prodHouse', 'ASC']]})
    .then(prodHouse=>{
      res.render('productionHouse', {prodHouse})
    })
  }


}


module.exports = ProductionHouseController