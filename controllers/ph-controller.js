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

    static getAddForm(req, res) {
        let id = req.params.id
        let error = req.query.error
        res.render("add-productionHouses.ejs", {id, error})
    }

    static postAdd(req, res) {
        let queryBody = req.body
        

    }

    static getEditForm(req, res) {

    }

    static postEdit(req, res) {

    }

    static delete(req, res) {

    }

    static searchPhById(req, res) {

    }
}

module.exports = ProductionHousesController