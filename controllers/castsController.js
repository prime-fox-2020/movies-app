const { Cast, Movie } = require('../models')
const getAge = require('../helper/getAge')

class CastController {

  static getCasts(req, res){
    let alert = req.query
    Cast.findAll()
    .then(data=>{
      res.render('casts', {data, alert})      
    }).catch(error=>{
      res.render('error', {error})      
    })
  }

  static addGet(req, res){
    res.render('addCast')
  }

  static addPost(req,res){
    // res.send(req.body)
    Cast.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_year: req.body.birth_year,
      gender: req.body.gender,
      phone_number: req.body.phone_number
    })
      .then(()=>{
        let msg = `${req.body.first_name} ${req.body.last_name} has been success add to casts list`
        res.redirect(`/casts?message=${msg}&type=success`)
      }).catch(error=>{
        res.render('error', {error})
      })
  }

  static delete(req,res){
    Cast.destroy({ where: { id: Number(req.params.id) }})
    .then(()=>{
      res.redirect(`/casts?message=cast with id: ${req.params.id} has been deleted!&type=success`)
    }).catch(error=>{
      res.render('error', {error})
    })
  }

  static editGet(req,res){
    
    Cast.findByPk(req.params.id)
    .then(data=>{
      res.render('editCast', {data})
    }).catch(error=>{
      res.render('error', {error})
    })
  }

  static editPost(req,res){
    Cast.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_year: req.body.birth_year,
      gender: req.body.gender,
      phone_number: req.body.phone_number
    }, { where: { id: Number(req.params.id) }})
    .then(()=>{        
      res.redirect(`/casts?message=Cast with id: ${req.params.id} has been succeess edited!&type=success`)
    })
    .catch(error=>{
      res.render('error', {error})
    })
  }

  static getMovies(req,res){
    Cast.findByPk(req.params.id, {include: [{model: Movie}]})
    .then(data=>{
      res.render('castMovies', {data, getAge})
    })
    .catch(error=>{
      res.render('error', {error})
    })
  }
}


module.exports = CastController