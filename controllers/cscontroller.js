const { Casts, Movies ,MovieCasts} = require('../models/index')

class CastsController{
    
    static create(req,res){

    }
    
    static createCast(req,res){
        // res.render('castAdd')
        Movies.findAll({})
        .then(moviedata=>{
            // res.send({model : data})
            res.render('castAdd',{data : moviedata})
        })
        .catch(err=>{
            res.send(err)
        })
    }



}

module.exports = CastsController