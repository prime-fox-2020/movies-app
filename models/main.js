const {ProductionHouse, Cast, Movie, MovieCast} = require('./index.js')

class Backend {

    static productionHouseLists() {
        return ProductionHouse.findAll({raw: true})
            .then(result => result)
            .catch(error => error)
    }

    static movieLists() {
        return Movie.findAll({raw: true, include: [{model: ProductionHouse}]})
            .then(result => result)
            .catch(error => error)
    }

    static newMovie = content => {
        const {name, rating, releasedYear, ProductionHouseId, genre} = content
        return Movie.create({
            name: name,
            rating: Number(rating), 
            releasedYear: Number(releasedYear),
            ProductionHouseId: Number(ProductionHouseId),
            genre: genre
        })
        .then(() => '/movies?action=register&status=succeeded')
        .catch(error => error)
    }

    static findMovieById = id => {
        return Movie.findAll({raw: true, where: {id: id}})
            .then(result => result)
            .catch(error => error)
    }

    static updateMovie = (content, id) => {
        const {name, rating, releasedYear, ProductionHouseId, genre} = content
        return Movie.update({
            name: name,
            rating: Number(rating),
            releasedYear: Number(releasedYear),
            ProductionHouseId: Number(ProductionHouseId),
            genre: genre
        }, {where: {id: id}})
        .then(() => `/movies?action=update&title=${name}&status=succeeded`)
        .catch(error => error)
    }

    static castList() {
        
        return Cast.findAll()
            .then(result => result)
            .catch(error => error)
    }

    static findCastById = id => {
        return Cast.findAll({raw: true, where: {id: id}})
            .then(result => result)
            .catch(error => error)
    }

    static newCast = content => {
        const {first_name, last_name, birth_year, gender, phone_number} = content
        return Cast.create({
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            birth_year: Number(birth_year),
            phone_number: Number(phone_number)
        })
        .then(() => '/casts?action=register&status=succeeded')
        .catch(error => error)
    }

    static updateCast = (content, id) => {
        const {first_name, last_name, birth_year, gender, phone_number} = content
        return Cast.update({
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            birth_year: Number(birth_year),
            phone_number: Number(phone_number)
        }, {where: {id: id}})
        .then(() => `/casts?action=update&name=${first_name}_${last_name}&status=succeeded`)
        .catch(error => error)
    }

    static casting = (content, movieId) => {
        const {Role, CastId} = content

        return MovieCast.create({
            MovieId: Number(movieId),
            CastId: Number(CastId),
            Role: Role
        })
        .then(() => `/casting/add/${movieId}?action=casting&castid=${CastId}&movieid=${movieId}&status=succeeded`)
        .catch(error => error)
    }

    static loadCurrentCasts = movieId => {
        return MovieCast.findAll({raw: true, include: [{model: Movie}, {model: Cast}], where: {MovieId: movieId}})
            .then(result => result)
            .catch(error => error)
    }

    static loadCurrentMovies = castId => {
        return MovieCast.findAll({raw: true, include: [{model: Movie}, {model: Cast}], where: {CastId: castId}})
            .then(result => result)
            .catch(error => error)
    }

    static deleteCast = castId => {
        return MovieCast.destroy({where: {CastId: castId}})
            .then(() => {
                return Cast.destroy({where: {id: castId}})
            })
            .then(() => '/casts?action=delete&status=succeeded')
            .catch(error => error)
    }

    static deleteMovie = movieId => {
        return MovieCast.destroy({where: {MovieId: movieId}})
            .then(() => {
                return Movie.destroy({where: {id: movieId}})
            })
            .then(() => '/movies?action=delete&status=succeeded')
            .catch(error => error)
    }
}

module.exports = Backend;