const Movie = require('../models').Movie
const ProductionHouse = require('../models').ProductionHouse

class MovieController{
    static getHome(req, res){
        const alert = req.query
        Movie.findAll({
            include: [{model : ProductionHouse}],
            order : [ 
                ['released_year', 'DESC']
            ]
        })
        .then( data => {
            res.render('movie', {data, alert})
        })
        .catch( err => {
            res.render('error', {msg : err})
        })
    }

    static add(req, res){
        const alert = req.query
        ProductionHouse.findAll()
        .then( data => {
            res.render('addMovie', {data, alert})
        })
        .catch( err => {
            res.render('error', {msg: err})
        })
    }

    static addPost(req, res){
        const validate = MovieController.validate(req.body)
        if(validate.length > 0){
            res.redirect(`/movies/add?msg=${validate.join(', ')}`)
        } else {
            Movie.create({
                name: req.body.name,
                released_year: req.body.released_year,
                genre: req.body.genre,
                ProductionHouseId: req.body.ProductionHouseId
            })
            .then( () => {
                const msg = `Movie titled '${req.body.name}' has been added`
                res.redirect(`/movies?msg=${msg}`)
            })
            .catch( err => {
                res.render('error', {msg: err})
            })
        }
    }

    static edit(req, res){
        const alert = req.query
        let dataProductionHouse
        ProductionHouse.findAll()
        .then( data => {
            dataProductionHouse = data
            return Movie.findByPk(Number(req.params.id))
        })
        .then( data => {
            res.render('editMovie', {data, dataProductionHouse, alert})
        })
        .catch( err => {
            res.render('error', {msg: err})
        })
    }

    static editPost(req, res){
        const validate = MovieController.validate(req.body)
        if(validate.length > 0){
            res.redirect(`/movies/edit/${req.params.id}?msg=${validate.join(', ')}`)
        } else {
            Movie.update(
                {
                    name: req.body.name,
                    released_year: req.body.released_year,
                    genre: req.body.genre,
                    ProductionHouseId : req.body.ProductionHouseId
                },
                {
                    where: {
                        id: Number(req.params.id)  
                    }
                }
            )
            .then( () => {
                const msg = `Movie has been edited successfully`
                res.redirect(`/movies?msg=${msg}`)
            })
            .catch( err => {
                res.send('error', {msg : err})
            })
        }
    }

    static delete(req, res){
        Movie.destroy({
            where:{
                id: Number(req.params.id)
            }
        })
        .then( () => {
            const msg = `Movies has been deleted successfully`
            res.redirect(`/movies?msg=${msg}`)
        })
        .catch( err =>{
            res.render('error', {msg: err})
        })
    }

    static validate(data){
        const error = []
        if(!data.name){
            error.push('Movie name is required')
        }
        if(data.released_year){
            if(isNaN(data.released_year)){
                error.push('Invalid released year')
            }
            else {
                const year = new Date().getFullYear()
                if(data.released_year > year){
                    error.push('Invalid released year')
                }
            }
        }
        if(!data.genre){
            error.push('Movie genre is required')
        }
        return error
    }
}

module.exports = MovieController