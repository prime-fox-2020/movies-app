const {Movie, ProductionHouse} = require('../models')

class Controller{
    static read_prod_house(req, res){
        ProductionHouse.findAll({order: [['name_prodHouse', 'asc']]})
        .then(data => {
            res.render('production_house', {data});
        })
        .catch(err => {
            res.send(err);
        })
    }
    
    static read_movie(req, res){
        Movie.findAll({
            include: ProductionHouse,
            order: [['id', 'asc']]
        })
        .then(data => {
            res.render('movie', {data})
        })
        .catch(err => {
            res.send(err);
        })
    }

    static add_get(req,res){
        res.render('movie_add');
    }

    static add_post(req, res){
        let data = req.body;
        data.createdAt = new Date(), data.updatedAt = new Date();
        data.released_year = Number(data.released_year)
        data.ProductionHouseId = Number(data.ProductionHouseId);

        Movie.create(data)
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static edit_get(req, res){
        Movie.findByPk(req.params.id, {})
        .then(data => {
            res.render('movie_edit', {data});
        })
        .catch(err => {
            res.send(err);
        })
    }

    static edit_post(req, res){
        let data = req.body;
        data.updatedAt = new Date();
        data.released_year = Number(data.released_year);
        data.ProductionHouseId = Number(data.ProductionHouseId);
        
        Movie.update(data, {where: {id: req.params.id}})
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static delete(req, res){
        Movie.destroy({where: {id: req.params.id}})
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            res.send(err);
        })
    }
}

module.exports = Controller;