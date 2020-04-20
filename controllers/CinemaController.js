const Movie = require('../models').Movie;
const ProductionHouse = require('../models').ProductionHouse;

class CinemaController {
    static movieList(req, res) {
        const msg = req.query.msg;
        Movie.findAll()
        .then(list => res.render('movie', {list, msg, type:"success"}))
        .catch(err => res.render('error', {msg:err}));
    }

    static productionHouseList(req, res) {
        const msg = req.query.msg;
        ProductionHouse.findAll()
        .then(list => res.render('productionHouse', {list, msg, type:"success"}))
        .catch(err => res.render('error', {msg:err}));
    }
    
    static error(req, res) {
        res.render('error', {msg: "Page not found!"})
    }
    
}

module.exports = CinemaController;