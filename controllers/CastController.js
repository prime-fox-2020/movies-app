const{ Movie, ProductionHouse, Cast, MovieCast} = require('../models')

class CastController{
    static show(req, res){
        Cast.findAll({
            order: [['id', 'ASC']]
        })
        .then(data =>{
            // res.send(data)
            res.render('casts', {data})
        })
    }
    
    static addCastForm(req, res){
        res.render('addcastform')
    }

    static add(req, res){
        // res.send(req.body)
        Cast.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_year: Number(req.body.birth_year),
            gender: req.body.gender
        }).then(data =>{
            res.redirect('/casts')
        }).catch(err =>{
            res.send(err)
        })
    }

    static editCastForm(req, res){
        Cast.findByPk(req.params.id)
        .then(data =>{
            // res.send(data)
            res.render('./editcastform', {data})
        }).catch(err =>{
            res.send(err)
        })
    }

    static editCast(req, res){
        Cast.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_year: Number(req.body.birth_year),
            gender: req.body.gender
        },{
            where:{
                id: req.params.id
            }
        }).then(data =>{
            // res.send(data)
            res.redirect('/casts')
        }).catch(err =>{
            res.send(err)
        })
    }

    static delete(req, res){
        Cast.destroy({
            where:{
                id: req.params.id
            }
        }).then(data =>{
            res.redirect('/casts')
        }).catch(err =>{
            res.send(err)
        })
    }

    static seeMovies(req,res){
        Cast.findByPk(req.params.id, {include: Movie})
        .then(data =>{
            // res.send(data)
            res.render('seemovies', {data})
        })
    }
}

module.exports = CastController