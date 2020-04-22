const ProductionHouse = require('../models').ProductionHouse

class ProductionHouseController {
    static show (req, res){
        ProductionHouse.findAll(
            {order: [['name_prodHouse', 'asc']]}
        )
        .then(data => {
            res.render('viewproductionhouses', { data })
        }).catch(err => {
            res.send(err)
        })
    }

}

module.exports = ProductionHouseController