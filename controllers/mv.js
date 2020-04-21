const { Movie , ProductionHouse , Cast } = require('../models/index')

class Controller{

    static findAll(req,res){
        Movie.findAll({
            order: [['released_year', 'asc']],
            include: [{ model: ProductionHouse }]
        })
        .then(data => {
            // res.render('',{data : Movie})
            res.render('mv',{data})
            console.log(data[0].ProductionHouse)
            // res.send(data)
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    }

    static mvcast(req,res){
        Movie.findAll({
            order: [['released_year', 'asc']],
            include: [{ model: Cast }]
        })
        .then(data => {
            // res.render('',{data : Movie})
            // res.render('mv',{data})
            res.send(data)
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    }

    static create(req,res){
        ProductionHouse.findAll({})
        .then(data=>{
            res.render('mvadd', {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static add(req,res){
        const body = req.body
        console.log(body)

        body.name = body.name
        body.released_year = body.released_year
        body.genre = body.genre
        body.createdAt = new Date()
        body.updatedAt = new Date()
        body.productionHouseId = body.phId

        Movie.create(body)
        .then(()=>{
            res.redirect('/mv')
        })
        .catch(err=>{
            res.send(err)
        })

    }

    static edit(req,res){
        const id = req.params.id
        let ByPkData = null
        Movie.findByPk(id, { include: { model: ProductionHouse } })
        .then(data => {
            ByPkData = data
            return ProductionHouse.findAll({})
        })
        .then(data=>{
            res.render('mvedit', {data,ByPkData})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static change(req,res){
        const body = req.body
        console.log (body)

        body.name = body.name
        body.released_year = body.released_year
        body.genre = body.genre
        body.createdAt = new Date()
        body.updatedAt = new Date()
        body.productionHouseId = body.phId

        Movie.update(body,{ where: { id: req.params.id } })
        .then(()=>{
            res.redirect('/mv')
        })
        .catch(err=>{
            res.send(err)
        })

    }

    static destroy(req,res){
        const id = req.params.id
        Movie.destroy({ where: { id: id } })
        .then(() => {
            res.redirect('/mv')
        })
        .catch(err => {
            res.send(err)
        })
      
    }


}

module.exports = Controller