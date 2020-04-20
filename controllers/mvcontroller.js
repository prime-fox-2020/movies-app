
const { Movies,ProductionHouses } = require('../models/index')

class MoviesController{
    
    static create(req,res){

    }
    
    static createMovie(req,res){
        res.render('moviesadd')
    }


}



module.exports=MoviesController