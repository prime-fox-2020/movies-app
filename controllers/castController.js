const {Cast, Movie, MovieCast} = require('../models');
const age = require('../helper/age')


class CastController{
  
  static show(req,res){
    const msg = req.query.msg
    Cast.findAll()
      .then(casts=>{
        res.render('cast', {casts, msg})
      })
    
  }
  
  
  
  
  static addGet(req,res){
res.render('castAdd')
  }



  static addPost(req,res){
    Cast.create({
      first_name : req.body.first_name,
      last_name: req.body.last_name,
      birth_year: req.body.birth_year,
      phone_number: req.body.phone_number,
      gender: req.body.gender
    })
    .then(cast=>{
      res.redirect('/casts')
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static delete(req,res){
    let data;
    Cast.findByPk(req.params.id)
    .then(casts=>{
      data = casts.fullName()
     return Cast.destroy({
        where: {
          id: req.params.id
        }
      })
        .then((hapus) => {
          res.redirect(`/casts/?msg=Succesfully deleted (${data})`);
        })
       
    })
    .catch((err) => {
      res.send(err);
    });
  }
  static deleteQuestion(req,res){
    Cast.findByPk(Number(req.params.id))
    .then(casts=>{
      res.render('castQuestion', {casts})
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static seeMovies(req,res){
    Cast.findAll({
      where:{
        id : Number(req.params.id)
    },
    include : [{model: Movie}]
  })
    .then(data=>{
     
      res.render('seeMovies', {casts: data[0], age})
    })
    .catch(err=>{
      res.send(err)
    })
  }
  
static editGet(req,res){
  Cast.findByPk(Number(req.params.id))
  .then(casts=>{
    res.render('castEdit', {casts})
  })
  .catch(err=>{
    res.send(err)
  })
}

static editPost(req,res){
  Cast.update({
    first_name : req.body.first_name,
    last_name: req.body.last_name,
    birth_year: req.body.birth_year,
    phone_number: req.body.phone_number,
    gender: req.body.gender
  },{
    where:{
      id : Number(req.params.id)
    }
  })
  .then(cast=>{
    res.redirect('/casts')
  })
  .catch(err=>{
    res.send(err)
  })
}
}


module.exports = CastController