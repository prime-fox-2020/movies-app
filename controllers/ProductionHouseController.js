const ProductionHouse = require('../models').ProductionHouse

class ProductionHouseController{
    static getHome(req, res){
        ProductionHouse.findAll({
            order: [
                ['name_prodHouse', 'ASC']
            ]
        })
        .then( data => {
            res.render('productionhouse', {data})
        })
        .catch( err => {
            res.render('error', {msg : err})
        })
    }
}

module.exports = ProductionHouseController