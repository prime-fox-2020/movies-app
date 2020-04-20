const {ProductionHouse} = require('../models')

class ProductionHouseController {

  static show(req, res) {
    const locals = ProductionHouseController.getLocals()
    locals.title = 'List of Production Houses'
    locals.alert = { message: [req.body.message], type: req.body.type }

    ProductionHouse.findAll({
      order: [['id', 'ASC']]
    })
    .then(results => {
      if (results.length) {
        locals.data = results
        res.render('productionHouse', locals)
      } else {
        locals.alert.message = [`You dont have any production house data in database.`]
        locals.alert.type = 'danger'
        res.render('productionHouse', locals)
      }
    })
    .catch(err => {
      locals.alert.message = [err]
      locals.alert.type = 'danger'
      res.render('productionHouse', locals)
    })
  }

  static getLocals() {
    return {
      alert: { message: null, type: null },
      data: null,
      method: null,
      title: null,
      page: 'Production House'
    }
  }
}

module.exports = ProductionHouseController