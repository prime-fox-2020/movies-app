const ProductionHouse = require('../models').ProductionHouse

class ProductionHouseController {
    static show(req,res) {
        ProductionHouse.findAll().then(data => {
            // res.send(data)
            res.render('productionhouse', {data})
        })
    }
}

module.exports = ProductionHouseController