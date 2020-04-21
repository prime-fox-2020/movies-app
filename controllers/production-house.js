const { ProductionHouse } = require('../models');

class ProductionHouseController {
    static list(req, res) {
        ProductionHouse.findAll({
            order: [
                ['nameProdHouse', 'asc']
            ]
        }).then(data => {
            res.render('production-houses', {productionHouses: data});
        });
    }
}

module.exports = ProductionHouseController;