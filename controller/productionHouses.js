const ProductionHouse = require('../models').ProductionHouse;

class ProductionHousesController {
  static getData(req, res) {
    ProductionHouse.findAll({
      order: [['name_prodHouse', 'ASC']]
    })
    .then(data => {
      res.render('productionHouse', {data});
    })
    .catch(err => res.send(err))
  }
}

module.exports = ProductionHousesController;