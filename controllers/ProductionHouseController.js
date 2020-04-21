const {Movie, ProductionHouse, Cast, MovieCast} = require('../models')

class ProductionHouseController {
    static show(req,res) {
        ProductionHouse.findAll().then(data => {
            // res.send(data)
            res.render('productionhouse', {data})
        })
    }
}

module.exports = ProductionHouseController