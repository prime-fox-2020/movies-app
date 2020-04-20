const { ProductionHouse } = require('../models');

class ProductionHouseController{
    static show(req, res){
        ProductionHouse.findAll({
            order: [
                ['name_prodHouse', 'asc']
            ]
        })
        .then(data => {
            res.render('prodHouse', {prodHouse: data})
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }
}

module.exports = ProductionHouseController