const Backend = require('../models/main.js')

class ProductionHouse {
    static show(request, response) {
        Backend.productionHouseLists()
            .then(result => response.render('lists', {data: result, page: 'ph'}))
            .catch(error => response.send(error))
    }
}

class Movie {
    static show = (request, response) => {
        Backend.movieLists()
            .then(result => response.render('lists', {data: result, page: 'mv'}))
            .catch(error => response.send(error))
    }

    static new = (request, response) => {
        Backend.productionHouseLists()
            .then(result => response.render('new', {phlists: result, page: 'mv', editing: false}))
            .catch(error => response.send(error))
    }

    static create = (request, response) => {
        Backend.newMovie(request.body)
            .then(result => response.redirect(302, result))
            .catch(error => response.send(error))
    }

    static edit = (request, response) => {
        Backend.productionHouseLists()
        .then(phlists => {

            Backend.findMovieById(request.params.movieid)
                .then(result => response.render('new', {data: result, phlists: phlists, page: 'mv', editing: true}))
                .catch(error => response.send(error))
        })

        .catch(error => response.send(error))
    }

    static update = (request, response) => {
        Backend.updateMovie(request.body, request.params.movieid)
            .then(redir => response.redirect(302, redir))
            .catch(error => response.send(error))
    }

    static casting = (request, response) => {
        Backend.findMovieById(request.params.movieid)
            .then(movie => {

                Backend.castList()
                    .then(result => {
                        Backend.loadCurrentCasts(request.params.movieid)
                            .then(casts => {
                                response.render('new', {data: result, castList: casts, page: 'ctm', movieTitle: movie[0].name, movieId: request.params.movieid})
                            })
                    })
                    .catch(error => error)
            })
            .catch(error => response.send(error))
    }

    static saveCasting = (request, response) => {
        Backend.casting(request.body, request.params.movieid)
            .then(redir => response.redirect(302, redir))
            .catch(error => response.send(error))
    }

    static deleteMovie = (request, response) => {
        Backend.deleteMovie(request.params.movieid)
            .then(redir => response.redirect(302, redir))
            .catch(error => response.send(error))
    }
}

class Cast {

    static show = (request, response) => {
        Backend.castList()
            .then(result => response.render('lists', {data: result, page: 'ct'}))
            .catch(error => response.send(error))
    }

    static new = (request, response) => {
        response.render('new', {data: null, editing: false, page: 'ct'})
    }

    static edit = (request, response) => {
        Backend.findCastById(request.params.castid)
            .then(result => response.render('new', {data: result, editing: true, page: 'ct'}))
            .catch(error => response.send(error))
    }

    static create = (request, response) => {
        Backend.newCast(request.body)
            .then(result => response.redirect(302, result))
            .catch(error => response.send(error))
    }

    static update = (request, response) => {
        Backend.updateCast(request.body, request.params.castid)
            .then(result => response.redirect(302, result))
            .catch(error => response.send(error))
    }

    static currentMovies = (request, response) => {
        Backend.findCastById(request.params.castid)
            .then(castName => {
                Backend.loadCurrentMovies(request.params.castid)
                    .then(result => {
                        response.render('lists', {data: result, castName: castName[0].first_name + ' ' + castName[0].last_name, page: 'sm'})
                    })
            })
    }

    static deleteCast = (request, response) => {
        Backend.deleteCast(request.params.castid)
            .then(redir => response.redirect(302, redir))
            .catch(error => response.send(error))
    }

}

module.exports = {ProductionHouse, Movie, Cast}