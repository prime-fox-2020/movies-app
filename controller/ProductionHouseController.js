const PHM = require('../models').productionHouses;


class ProductionHouseController {
  static show(req, res) {
    PHM.findAll()
    .then(data => {
      res.render('productionHouse' , {data})
    })
    .catch( err => {
      res.send(err);
    })
  }
}

module.exports = ProductionHouseController;
