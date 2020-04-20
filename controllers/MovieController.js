const  { Movie, ProductionHouse } = require('../models')


class MovieController {

    static show(req, res){
        const list = req.query
        Movie.findAll(
            // { 
            //     order : ['released_year'], 
            //     include: [{model : ProductionHouse}]
            // }
        )
        .then( data => {
            // res.send('Finally in Movies from Controller')
            res.render('movie', {data})
        })
        .catch( err => {
            res.render('error')
        })
    }

    static addPage(req, res){
        // ProductionHouse.findAll()

    }

    static postAddPage(req, res){

    }

    static editPage(req, res){

    }

    static postEditPage(req, res){

    }

    static delete(req, res){

    }
}

module.exports = MovieController;