const {ProductionHouse} = require('../models');

class ProductionHouseCont {
    static show(req, res) {
        // res.send('ini di controller prod house')
        ProductionHouse.findAll({
            order: [
                ['name_prodHouse', 'ASC']
            ]
        })
        .then((data) => {
            res.render('productionHouses',{data})
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = ProductionHouseCont;
