const ProductionHouse = require('../models').ProductionHouse

class ProductionHouseController {
    static show(req, res) {
        ProductionHouse.findAll({
            order: [['name_prodHouse', 'ASC']]
        })
            .then(data => {
            res.render('productionHouse', { data })
            // console.log(data);
            })
            .catch(err => {
            res.send(err)
            })
    }
}
module.exports = ProductionHouseController