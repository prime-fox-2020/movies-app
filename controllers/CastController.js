const  { Cast, Movie, MovieCast } = require('../models')
class CastController {

    static show(req, res){
        Cast.findAll(
            { 
                include: [{model : Movie}]
            }
        )
        .then( data => {
            // res.send(data)
            res.render('cast', {data})
        })
        .catch( (err) => {
            res.render('error', {msg: err})
        })
    }

    static addPage(req, res){
        const alert = req.query
        res.render('add-cast', {alert})
    }

    static postAddPage(req, res){
        let year
        if(!req.body.birth_year){
            year = null
        } else {
            year = Number(req.body.birth_year)
        }
        Cast.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        })
        .then( () => {
            res.redirect(`/casts`)
        })
        .catch( err => {
            const msg = []
            for(let i = 0; i < err.errors.length; i++){
                msg.push(err.errors[i].message)
            }
            res.redirect(`/casts/add?msg=${msg.join(', ')}`)
        })
    }

    static editPage(req, res){
        Cast.findByPk(Number(req.params.id))
        .then( data =>{
            res.render('edit-cast', {data})
        })
        .catch ( err => {
            res.render('error', {msg:err})
        })

    }

    static postEditPage(req, res){
        Cast.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                birth_year: req.body.birth_year,
                phone_number: req.body.phone_number,
                gender: req.body.gender
            },
            {
                where: {
                    id: Number(req.params.id)  
                }
            }
        )
        .then( () => {
            res.redirect(`/casts`)
        })
        .catch( err => {
            res.send('error', {msg : err})
        })
    }

    static delete(req, res){
        Cast.destroy({
            where:{
                id: Number(req.params.id)
            }
        })
        .then( () => {
            res.redirect(`/casts`)
            return MovieCast.destroy({
                where: {
                    CastId: Number(req.params.id)
                }
            })
        })
        .catch( () =>{
            res.render('error')
        })
    }

    static movieCast(req, res){
        const age = require('../helper/age')
        Cast.findByPk(Number(req.params.id), {
            include: [{ model : Movie}]
        })
        .then( data => {
            // res.send(data)
            res.render('movieCast', {data, age})
        })
        .catch( err => {
            res.render('error')
        })
    }
}

module.exports = CastController;