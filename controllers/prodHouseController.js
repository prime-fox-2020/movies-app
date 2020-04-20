const {ProductionHouse} = require('../models')

class ProductionHouseController {
    static showProdHouse(req,res){
        ProductionHouse.findAll({
            order : [
                ['name_prodHouse', 'ASC']
            ]
        })
        .then( data=> {
            // res.send(data)
            res.render('prodHouse', {data})
        })
        .catch(err=> {
            res.send(err)
        })
    }
}

module.exports = ProductionHouseController