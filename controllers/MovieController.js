const  { Movie, ProductionHouse } = require('../models')


class MovieController {

    static show(req, res){
        const alert = req.query
        Movie.findAll(
            { 
                include: [{model : ProductionHouse}],
                order : [['released_year', 'DESC']] 
            }
        )
        .then( data => {
            // res.send('Finally in Movies from Controller')
            // res.send(data)
            res.render('movie', {data, alert})
        })
        .catch( () => {
            res.render('error')
        })
    }

    static valid(data){
        const error = []
        if(!data.name || !data.genre || !data.released_year){
            error.push('Please do not leave an empty data.')
        }
        else if(data.released_year > 2020){
            error.push('Invalid released year')
        }
        return error
    }

    static addPage(req, res){
        const alert = req.query
        ProductionHouse.findAll()
        .then( data => {
            // res.send(data)
            res.render('add-movie', {data, alert})
        })
        .catch( () => {
            res.render('error')
        })

    }

    static postAddPage(req, res){
        const invalid = MovieController.valid(req.body)
        if(invalid.length > 0){
            res.redirect(`/movies/add?msg=${invalid.join(', ')}`)
        } else {
            Movie.create({
                name: req.body.name,
                released_year: req.body.released_year,
                genre: req.body.genre,
                ProductionHouseId: req.body.ProductionHouseId
            })
            .then( () => {
                const msg = `Succesfully added new movie '${req.body.name}'`
                res.redirect(`/movies?msg=${msg}`)
            })
            .catch( () => {
                res.render('error')
            })
        }
    }

    static editPage(req, res){
        const alert = req.query
        let newData
        ProductionHouse.findAll()
        .then( temp => {
            newData = temp
            return Movie.findByPk(Number(req.params.id))
        })
        .then( data => {
            res.render('edit-movie', {data, newData, alert})
        })
        .catch( () => {
            res.render('error')
        })

    }

    static postEditPage(req, res){
        const invalid = MovieController.valid(req.body)
        if(invalid.length > 0){
            res.redirect(`/movies/edit/${req.params.id}?msg=${invalid.join(', ')}`)
        } else {
            Movie.update({
                    name: req.body.name,
                    released_year: req.body.released_year,
                    genre: req.body.genre,
                    ProductionHouseId : req.body.ProductionHouseId
            }, {
                where: {
                    id: Number(req.params.id)  
                }
            })
            .then( () => {
                const msg = `Successfully edit selected movie.`
                res.redirect(`/movies?msg=${msg}`)
            })
            .catch( () => {
                res.render('error')
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
            const msg = `Successfully delete selected movie.`
            res.redirect(`/movies?msg=${msg}`)
        })
        .catch( () =>{
            res.render('error')
        })
    }
}

module.exports = MovieController;