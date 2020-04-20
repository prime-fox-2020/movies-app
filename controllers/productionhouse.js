const { ProductionHouse } = require('../models');

class ProductionHouseController {
    static showAll(req, res){
        ProductionHouse.findAll({
            attributes: ['name_prodHouse', 'headquarters'],
            order: [
                ['name_prodHouse', 'ASC']
            ]
        })
        .then(data => {
            res.render('list-of-ph', {data, title: 'List of Production House', nav: 'ph'})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ProductionHouseController