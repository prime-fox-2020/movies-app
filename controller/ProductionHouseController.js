const PHM = require('../models').ProductionHouse;


class ProductionHouseController {
  static show(req, res) {
    PHM.findAll({order: [['name_prodHouse', 'ASC']]})
    .then(data => {
      res.render('productionHouse' , {data})
    })
    .catch( err => {
      res.send(err);
    })
  }
}

module.exports = ProductionHouseController;
