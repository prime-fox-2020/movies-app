const { ProductionHouse } = require('../models')

class ProductionController {
    static get(req, res) {
        ProductionHouse.findAll({
            order: [
                ['name_prodHouse', 'ASC']
            ]
        })
            .then(data => {
                return res.render('production', { object: data })
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }
}


module.exports = ProductionController;