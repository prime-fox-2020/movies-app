const {Cast, Movie, MovieCast} = require('../models')
const formatAge = require('../helper/formatAge')

class CastController {
    static showCasts(req,res){
        const alert = req.query
        Cast.findAll()
        .then( data => {
            res.render('cast',{data,alert})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addCast(req,res){
        const alert = req.query
        res.render('addCast',{alert})
    }

    static addCastPost(req,res){
        Cast.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            phone_number : req.body.phone_number,
            birth_year : req.body.birth_year,
            gender : req.body.gender
        })
        .then(
            res.redirect('/cast')
        )
        .catch(error => {
            res.send(error)
        })
    }

    static editCast(req,res){
        const alert = req.query
        Cast.findByPk(Number(req.params.id))
        .then(data=> {
            res.render('editCast',{data,alert})
            
        })
        .catch(error=>{
            res.send(error)
        })
    }

    static editCastPost(req,res){
        Cast.update({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            phone_number : req.body.phone_number,
            birth_year : req.body.birth_year,
            gender : req.body.gender
        },{
            where: {id : Number(req.params.id)}
        })
        .then(
            res.redirect('/cast')
        )
        .catch(err=>{
            res.send(err)
        })
    }

    static deleteCast(req,res){
        Cast.destroy({
            where : {id : Number(req.param.id)}
        })
        .then(()=>{
            const msg = `Cast berhasil di hapus`
            res.redirect(`/cast?msg=${msg}`)
        })
        .catch(error => {
            res.send(error)
        })
    }

    static showMovieCast(req,res){
        Cast.findByPk(Number(req.params.id), {
            include: [{model: Movie}]
        })
        .then(data=>{
            res.send(data)
            // res.render('',{data,dataMovie})
        })
        .catch(error=> {
            res.send(error)
        })
    }
}

module.exports = CastController