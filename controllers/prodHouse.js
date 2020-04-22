const { ProductionHouse } = require('../models');

class Controller {
    static showData(req, res) {
        ProductionHouse.findAll({order: [['name_prodHouse', 'ASC']]})
        .then(data => {
            res.render('prodHouse', {data});
        })
        .catch(err => {
            res.render('error', {err});
        })
    }

    static notFound(req, res) {
        res.render('error', {mes: '404 - Page Not Found'});
    }
}

module.exports = Controller;