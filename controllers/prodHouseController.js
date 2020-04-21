const ProductionHouse = require('../models').ProductionHouse;

class ProdHouseController{
    static read(req, res){
        ProductionHouse.findAll({order: [['name_prodHouse', 'asc']]})
        .then(data => {
            res.render('production_house', {data});
        })
        .catch(err => {
            res.send(err);
        })
    }
}

module.exports = ProdHouseController;