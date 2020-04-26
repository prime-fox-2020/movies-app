const { ProductionHouse } = require('../models')

class ProdHouse {
    static showData(req, res) {
        ProductionHouse.findAll({
            order : [
                ['name_prodHouse', 'ASC']
            ]
        })
        .then(data => {
            res.render('prodHouse.ejs', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ProdHouse