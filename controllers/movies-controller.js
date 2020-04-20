const {Movies, ProductionHouse} = require('../models')

class MoviesController {
    static showMovies(req, res) {
        Movies.findAll({include: {model: ProductionHouse}, order: [['released_year', 'DESC']]})
        .then(data => {
            let dataMovies = data
            let dataProdHouse = ProductionHouse
            let pesan = req.query.pesan
            let id = req.params.id            
            res.render("movies.ejs", {dataMovies, pesan, id, dataProdHouse})
        })
        .catch(error => {
            res.send(error)
        })
    }

    static getAddForm(req, res) {
        let pesan = req.query.pesan
        let id = req.params.id
        let error = req.query.error
        ProductionHouse.findAll()
        .then(dataProdHouse => {
            res.render("add-movies.ejs", {pesan, id, dataProdHouse, error})
        })
        .catch(error => {
            res.send(error)
        })
    }

    static postAdd(req, res) {
        let mv = false;
        let ry = false;
        
        // Check & Validasi Movie Name
        if (req.body.name === '' || req.body.name === undefined) {
            res.redirect('/movies/add?error=Judul movie harus diisi')
        } else {
            mv = true
        }    
        
        // Check & Validasi Released Year
        if (req.body.released_year === '' || req.body.released_year === undefined) {
            res.redirect('/movies/add?error=Released Year harus diisi')
        } else if (req.body.released_year) {
            if (req.body.released_year < 2021 && req.body.released_year > 999) {
                ry = true
            } else {
                res.redirect('/movies/add?error=Released Year Tidak Valid')
            }
        }

        // Check All validations
        if (mv && ry) {
            let queryBody = req.body
            if (queryBody.ProductionHouseId == 'unknown') {
                queryBody.ProductionHouseId = null
            }
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
        let mv = false;
        let ry = false;
        
        // Check & Validasi Movie Name
        if (req.body.name === '' || req.body.name === undefined) {
            res.redirect(`/movies/edit/${req.params.id}?error=Judul movie harus diisi`)
        } else {
            mv = true
        }    
        
        // Check & Validasi Released Year
        if (req.body.released_year === '' || req.body.released_year === undefined) {
            res.redirect(`/movies/edit/${req.params.id}?error=Released Year harus diisi`)
        } else if (req.body.released_year) {
            if (req.body.released_year < 2021 && req.body.released_year > 999) {
                ry = true
            } else {
                res.redirect(`/movies/edit/${req.params.id}?error=Released Year Tidak Valid`)
            }
        }

        // Check All validations
        if (mv && ry) {
            let queryBody = req.body 
            if (queryBody.ProductionHouseId == 'Unknown') {
                queryBody.ProductionHouseId = null
            } 
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

    static searchMovieById(req, res) {
        Movies.findAll({include: {model: ProductionHouse}, order: [['released_year', 'DESC']]})
        .then(data => {
            let dataById = []
            let queryBody = req.body.movie_by_id
            let pesan = null
            let check = false
            for (let i in data) {
                if (data[i].id == queryBody) {
                    dataById.push(data[i])
                    check = true
                }
            }

            if (check == false) {
                pesan = "Maaf data movie dengan id " + queryBody + " tidak ada dalam database"
                res.render("movie-by-id.ejs", {dataById, queryBody, pesan})
            } else {
                pesan = ''
                res.render("movie-by-id.ejs", {dataById, queryBody, pesan})
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
}


module.exports = MoviesController               

