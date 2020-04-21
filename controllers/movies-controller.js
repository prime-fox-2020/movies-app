const {Movies, ProductionHouse, Cast, MovieCast} = require('../models')

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
        let errorKabisat = req.query.errorKabisat
        ProductionHouse.findAll()
        .then(dataProdHouse => {
            res.render("add-movies.ejs", {pesan, id, dataProdHouse, error, errorKabisat})
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
            if (req.body.released_year < 2051 && req.body.released_year > 999) {
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
                let errors = []
                for (let i = 0; i < err.errors.length; i++) {
                    errors.push(err.errors[i].message)
                }
                res.redirect(`/movies/add?errorKabisat=${errors[0]}`)
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
            if (req.body.released_year < 2051 && req.body.released_year > 999) {
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

    static getAddCastForm(req, res) {
        let error = req.query.error  
        let dataMovie = null
        let dataProdHouse = null
        let dataCast = null
        let id = req.params.id
        let pesan = req.query.pesan
        Movies.findByPk(id, {include: {model: ProductionHouse}})
        .then(data => {
            dataMovie = data.dataValues            
            return ProductionHouse.findAll()              
        })
        .then(prodHouseData => {
            dataProdHouse = prodHouseData
            return Cast.findAll()
        })
        .then(castData => {
            dataCast = castData
            return MovieCast.findAll({include: {model: Cast}, where : {"MovieId": id}})
        })
        .then(dataMovieCast => {
            console.log('getAddCastForm: ', dataMovieCast);
            res.render('addMovieCast.ejs', {id, dataMovie, error, dataProdHouse, dataCast, dataMovieCast, pesan})
            
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static postAddCast(req, res) {
        let actorId = Number(req.body.actor)
        let actorRole = req.body.role
        let movie_id = req.params.id
        console.log('movie id: ', movie_id)
        console.log('actor id: ', actorId);
        console.log('actor role: ', actorRole);
        MovieCast.create({
            "MovieId": movie_id,
            "CastId": actorId,
            "role": actorRole
        })
        .then(data => {
            console.log(data)
            res.redirect(`/movies/add-cast/${req.params.id}?pesan=Berhasil menambahkan cast`);
            
        })
        .catch(err => {
            let errors = []
            for (let i = 0; i < err.errors.length; i++) {
                errors.push(err.errors[i].message)
            }
            res.redirect(`/movies/add-cast/${req.params.id}?error=${errors[0]}`);
            // res.send(errors)
        })
    }
}


module.exports = MoviesController               

