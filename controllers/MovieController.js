const { Movie, ProductionHouse, Cast, MovieCast } = require('../models')

class MovieController {
    static show(req, res) {
        Movie.findAll({
            order: [
                ['released_year', 'DESC']
            ],
            include: [{ model: ProductionHouse }]
        }).then(data => {
            // res.send(data)
            res.render('movies', { data })
        })
    }

    static addMovieForm(req, res) {
        // res.send('yes')
        res.render('addMovieForm')
    }

    static addMovie(req, res) {
        Movie.create({
            name: req.body.name,
            released_year: Number(req.body.released_year),
            genre: req.body.genre
        }).then(data => {

            res.redirect('/movies')
        }).catch(err => {
            if(err.errors[0].validatorKey){
                res.send("ini tahun kabisat, buatlah film di tahun lain")
            }else{
            res.send(err)
        }
        })
    }

    static editMovieForm(req, res) {
        let globalProdHouse = null
        ProductionHouse.findAll().then(dataProd => {
            globalProdHouse = dataProd
        })
        Movie.findByPk(req.params.id).then(data => {
            // res.send({data: [{data}, {globalProdHouse}]})


            res.render('editmovieform', { data: [{ data }, { globalProdHouse }] })
        })
    }

    static editMovie(req, res) {
        // console.log(req.body);
        // res.send(req.body)
        Movie.update({
            name: req.body.name,
            released_year: Number(req.body.released_year),
            genre: req.body.genre,
            ProductionHouseId: Number(req.body.ProductionHouseId),
        }, {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.redirect('/movies')
        }).catch(err => {
            if(err.errors[0].validatorKey){
                res.send("ini tahun kabisat, buatlah film di tahun lain")
            }else{
            res.send(err)
        })

    }

    static delete(req, res) {
        Movie.destroy({
            where: {
                id: Number(req.params.id)
            }
        }).then(data => {
            res.redirect('/movies')
        }).catch(err => {
            res.send(err)
        })
    }

    static addCastForm(req, res) {
        // let castList = null
        // let castListMovie = null
        // Cast.findAll()
        //     .then(dataCast => {
        //         castList = dataCast
        //         return MovieCast.findAll({
        //             where: {
        //                 MovieId: req.params.id
        //             }
        //         })
        //     }).then(data => {
        //         castListMovie = data
        //         return Movie.findByPk(req.params.id)
        //     })
        //     .then(object => {
        //         // res.send(castListMovie)
        //         // res.send({ data: [[object], [castList], [castListMovie]] })
        //         res.render('addcastmovie', { data: [[object], [castList], [castListMovie]] })
        //     }).catch(err => {
        //         res.send(err)
        //     })
        let id = req.params.id
        Promise.all(
            [
                Cast.findAll(),
                Movie.findByPk(id, { include: Cast })
            ]).then(([casts, movie]) => {
                res.render('addcastmovie',{ casts, movie });
            }).catch(err => {
                res.send(err);
            });
    }


    static addCast(req, res) {
        // let temp = {
        //     MovieId: req.params.id,
        //     CastId: req.body.CastId,
        //     role: req.body.role
        // }
        MovieCast.create({
            MovieId: req.params.id,
            CastId: req.body.CastId,
            role: req.body.role
        })
            .then(data => {
                res.redirect(`/movies/${req.params.id}/addcast`)
            })
            .catch(err => {
                res.send(err.errors[0].message)
            })

    }
}

module.exports = MovieController