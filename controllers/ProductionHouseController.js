const ProductionHouse = require('../models').ProductionHouse

class ProductionHouseController {

    static show(req, res){
        let list = req.query
        ProductionHouse.findAll(
            { order: ['name_prodHouse'] }
        )
        .then( data => {
            // res.send(data)
            res.render('productionHouse', {data, list})
        })
        .catch( (err) => {
            // res.send('error loading data ProductionHouse for Movie App.')
            res.render('error')
        })
    }


}
module.exports = ProductionHouseController;