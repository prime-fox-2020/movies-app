const phModel = require('../models').ProductionHouse

class PhControl {
    static getList (req, res) {
        phModel.findAll()
        .then(data => {
            res.render('ph.ejs', {data})
        })
    }
    
}

module.exports = PhControl