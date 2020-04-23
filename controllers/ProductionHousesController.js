const {ProductionHouse} = require('../models')

class ProductionHouseController {

  static show(req, res) {
    res.locals.title += ' | List of Production Houses'
    res.locals.pageTitle = 'List of Production Houses'
    res.locals.page += 'Production House'

    ProductionHouse.findAll({
      order: [['name_prodHouse', 'ASC']]
    })
    .then(results => {
      if (results.length) {
        res.locals.pHouses = results
        res.render('productionHouse')
      } else {
        res.locals.alert.message = [`You dont have any production house data in database.`]
        res.locals.alert.type = 'danger'
        res.render('productionHouse')
      }
    })
    .catch(err => {
      res.locals.alert.message = [err]
      res.locals.alert.type = 'danger'
      res.render('productionHouse')
    })
  }

}

module.exports = ProductionHouseController