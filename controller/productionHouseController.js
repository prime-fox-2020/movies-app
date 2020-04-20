const ProductionHouses = require('../models').ProductionHouses;

class ProductionHouse {

    static PHList(req, res) {
      ProductionHouses.findAll()
      .then(data => {
        res.render('productionHouse', {data})
      })
      .catch(err => {
        res.send(err)
      })
      }
      // ProductionHouses.findAll()
      // .then(data => {
      //   res.render('ProductionHouse', {data});
      // })
      // .catch(err => {
      //   res.send(err);
      // })
}

module.exports = ProductionHouse;
