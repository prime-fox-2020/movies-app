const {Movie, ProductionHouse} = require('../models')

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
            // res.send(data)
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
        let error = MovieController.validation(req.body)
        if (error.length > 0){
            // res.send(error)
            res.redirect(`/movie/add?msg=${error.join(',')}`)
        } else {
            Movie.create({
                name: req.body.name,
                released_year : Number(req.body.released_year),
                genre : req.body.genre,
                ProductionHouseId : req.body.ProductionHouseId
            })
            .then(() => {
                const msg = `Movie : ${req.body.name} has been added`
                res.redirect(`/movie?msg=${msg}`)})
            .catch(err=>{
                res.send(err)
            })
        }
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
        let error = MovieController.validation(req.body)
        if (error.length > 0){
            // res.send(error)
            res.redirect(`/movie/edit/${req.params.id}?msg=${error.join(',')}`)
        } else {
            Movie.update({
                name:req.body.name,
                released_year : req.body.released_year,
                genre : req.body.genre,
                ProductionHouseId : req.body.ProductionHouseId
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
    }

    static deleteMovie(req,res){
        Movie.destroy({
            where : {id : Number(req.params.id)}
        })
        .then(() => {
            const msg = `Movie has been deleted`
            res.redirect(`/movie?msg=${msg}`)})
        .catch(err => {
            res.send(err)
        })
    }

    static validation(data){
        let error = []
        if(!data.name){
            error.push(`Invalid Name Section is Empty`)
        }
        if(!data.released_year){
            error.push(`Invalid Year Section is Empty`)
        }
        if(!data.genre){
            error.push(`Invalid Genre Section is Empty`)
        }
        return error
    }
}

module.exports = MovieController