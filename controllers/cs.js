const { Movie , ProductionHouse , Cast , MovieCast} = require('../models/index')
const helper = require('../helpers/age');

class Controller{

    static findAll(req,res){   
        Cast.findAll(
            {include: [{ model: Movie}]}
            )
        .then(data=>{
            res.render('cs', {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static create(req,res){
        let error = req.query.error
        Movie.findAll({})
        .then(data=>{
            res.render('csadd',{data,error})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static add(req,res){
        const body = req.body
        body.first_name=body.first_name
        body.last_name=body.last_name
        body.phone_number=body.phone_number
        body.birth_year= Number(body.birth_year)
        body.createdAt = new Date()
        body.updatedAt = new Date()
        let MovieId;
        let role;
        Cast.create(body)
        .then((data)=>{
            // res.redirect('/cs')
            MovieId = body.MovieId
            role = body.role
            return Cast.findOne({ where: { createdAt: data.createdAt } })
        })    
        .then(data=>{
            let otherData = {};
            otherData.MovieId = MovieId
            otherData.CastId = data.id
            otherData.role = role
            otherData.createdAt = new Date()
            otherData.updatedAt = new Date()
            return MovieCast.create(otherData)
        })
        .then(()=>{
            res.redirect('/cs')
        })
        .catch((err)=>{
            res.redirect(`/cs/add?error=${err.errors[0].message}`)
        })
    }

    static edit(req,res){
        const id = req.params.id
        let ByPkData;

        Cast.findByPk(id, { include : { model : Movie } })
        .then(data=>{
            ByPkData=data
            return Movie.findAll({})
        })
        .then(data=>{
            console.log(data)
            res.render('csedit',{data,ByPkData})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static change(req,res){
        const body = req.body

        body.first_name=body.first_name
        body.last_name=body.last_name
        body.phone_number=body.phone_number
        body.birth_year=Number(body.birth_year)
        body.gender=body.gender

        Cast.update(body,{ where: { id: req.params.id } })
        .then(()=>{
            res.redirect('/cs')
        })
        .catch(err=>{
            res.send(err)
        })

    }

    static destroy(req,res){
        const id = req.params.id
        Cast.destroy({ where: { id: id } })
        .then(() => {
            res.redirect('/cs')
        })
        .catch(err => {
            res.send(err)
        })
      
    }

    static seemovies(req,res){
        const id = req.params.id
        
        MovieCast.findAll({ where: { id: id } ,include: [{ model: Movie},{model : Cast}]})
        .then((data)=>{
            console.log(data[0].Cast)
            res.render('seemovies', {data , castName: data[0].Cast, calculateAge:helper})
        })
        .catch((err)=>{
            res.send(err)
        })
    }


}

module.exports = Controller