const {ProductionHouse} = require('../models')

class ProductionHousesController {
    static showPh(req, res) {
        ProductionHouse.findAll({order: [['name_prodHouse', 'DESC']]})
        .then(data => {
            let pesan = req.query.pesan
            let id = req.params.id
            res.render("productionHouses.ejs", {data, pesan, id})
        })
        .catch(error => {
            res.send(error)
        })
    }
}

module.exports = ProductionHousesController