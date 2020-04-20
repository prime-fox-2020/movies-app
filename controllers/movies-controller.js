const {Movies, ProductionHouse} = require('../models')

class MoviesController {
    static showMovies(req, res) {
        Movies.findAll({include: {model: ProductionHouse}, order: [['released_year', 'DESC']]})
        .then(data => {
            console.log(data);
            let pesan = req.query.pesan
            let id = req.params.id            
            res.render("movies.ejs", {data, pesan, id})
        })
        .catch(error => {
            res.send(error)
        })
    }

    static getAddForm(req, res) {
        let pesan = req.query.pesan
        let id = req.params.id
        ProductionHouse.findAll()
        .then(dataProdHouse => {
            res.render("add-movies.ejs", {pesan, id, dataProdHouse})
        })
        .catch(error => {
            res.send(error)
        })
    }

    static postAdd(req, res) {
        let queryBody = req.body
        console.log(queryBody);
        Movies.create({
            "name": queryBody.name,
            "released_year": queryBody.released_year,
            "genre": queryBody.genre,
            "ProductionHouseId": queryBody.ProductionHouseId
        })
        .then(data => {
            res.redirect(`/movies?pesan=berhasil menambah movie dengan judul ${queryBody.name}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getEditForm(req, res) {
        let error = req.query.error  
        let dataMovie = null
        let id = req.params.id
        Movies.findByPk(id, {include: {model: ProductionHouse}})
        .then(data => {
            dataMovie = data.dataValues
            return ProductionHouse.findAll()              
        })
        .then(dataProdHouse => {
            res.render('edit-movies.ejs', {id, dataMovie, error, dataProdHouse})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postEdit(req, res) {
        let queryBody = req.body
        console.log(queryBody);
        
        let id = req.params.id
        Movies.update({
            "name": queryBody.name,
            "released_year": queryBody.released_year,
            "genre": queryBody.genre,
            "ProductionHouseId": queryBody.ProductionHouseId
        }, {returning: true, where: {id}})
        .then(data => {
            res.redirect(`/movies?pesan=Berhasil edit data movie dengan id: ${id}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res) {
        let id = req.params.id
        Movies.destroy({where: {id}})
        .then(data => {
            res.redirect(`/movies?pesan=berhasil delete data movie dengan id ${id}`)
        })
        .catch(err => {
            res.send(err)
        })
    }
}


module.exports = MoviesController               
