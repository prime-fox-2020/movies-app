const {Movie, ProductionHouse, Cast, MovieCast} = require('../models')

class MovieController {
    static showMovies(req,res){
        const alert = req.query
        Movie.findAll({
            include : [{model : ProductionHouse}],
            order:[
                ['released_year','DESC']
            ]
        })
        .then( data => {
            res.render('movies', {data,alert})
        })
        .catch(err=> {
            res.send(err)
        })
    }

    static addMovies(req,res){
        const alert = req.query
        ProductionHouse.findAll()
        .then(data=> {
            res.render('addMovie', {data,alert})
        })
        .catch( error=> {
            res.send(error)
        })
        
    }
    
    static addMoviesPost(req,res){
        Movie.create({
            name: req.body.name,
            released_year : Number(req.body.released_year),
            genre : req.body.genre,
            ProductionHouseId : req.body.ProductionHouseId,
            rating : Number(req.body.rating)
        })
        .then(() => {
            const msg = `Movie : ${req.body.name} has been added`
            res.redirect(`/movie?msg=${msg}`)})
        .catch(err=>{
            res.send(err)
        })
    }

    static editMovie(req,res){
        const alert = req.query
        let dataPH
        ProductionHouse.findAll()
        .then( data => {
            dataPH = data
            return Movie.findByPk(Number(req.params.id))
        })
        .then(data => {
            res.render('editMovie',{data,dataPH,alert})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static editMoviePost(req,res){
        Movie.update({
            name:req.body.name,
            released_year : req.body.released_year,
            genre : req.body.genre,
            ProductionHouseId : req.body.ProductionHouseId,
            rating : Number(req.body.rating)
        },{
            where: {id : Number(req.params.id)}
        })
        .then(()=> {
            const msg = `Movie ${req.body.name} has been edited`
            res.redirect(`/movie?msg=${msg}`)})
        .catch(err => {
            res.send(err)
        })
    }

    static deleteMovie(req,res){
        Movie.destroy({
            where : {id : Number(req.params.id)}
        })
        .then(() => {
            const msg = `Movie has been deleted`
            res.redirect(`/movie?msg=${msg}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showMovieCast(req,res){
        let dataCast
        Cast.findAll()
        .then(data=> {
            dataCast = data
            return Movie.findByPk(Number(req.params.id),{ include: {model:Cast}})
        })
        .then(data=> {
            // res.send(data)
            // res.send(dataCast)
            res.render('addMovieCast', {data,dataCast})
        })
        .catch(error=> {
            res.send(error)
        })
    }
    
    static showMovieCastPost(req,res){
        let data = {
            MovieId : Number(req.params.id),
            CastId : Number(req.body.castId),
            role : req.body.role
        }
        MovieCast.create(data)
        .then(()=>{
            res.redirect(`/movie/showCast/${req.params.id}`)
        })
        .catch(error => {
            res.send(error)
        })
    }
}

module.exports = MovieController