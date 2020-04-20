const { Movie,ProductionHouse } = require('../models/index')

class Controller{

    static findAll(req,res){
        Movie.findAll({
            order: [['name', 'asc']],
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

    static createMovie(req,res){
        res.render('mvadd')
    }

    static addMovie(req,res){
        const body = req.body
        let phid ;
        if(req.body.ph == 'Walt Disney Studios'){
            phid = 1
        }
        if(req.body.ph == 'Pixar'){
            phid = 2
        }
        if(req.body.ph == 'Warner Bros'){
            phid = 3
        }
        if(req.body.ph == 'Universal Pictures'){
            phid = 4
        }
        if(req.body.ph == 'Paramount Picture'){
            phid = 5
        }

        body.name = body.name
        body.released_year = body.released_year
        body.genre = body.genre
        body.createdAt = new Date()
        body.updatedAt = new Date()
        body.productionHouseId = phid

        Movie.create(body)
        .then(()=>{
            res.redirect('/mv')
        })
        .catch(err=>{
            res.send(err)
        })

    }

    static editForm (req,res){
        const id = req.params.id
        Movie.findByPk(id, { include: { model: ProductionHouse } })
          .then(data => {
            res.render('mvedit', { data })
            // res.send(data)
            // console.log(data.ProductionHouse.name_prodHouse)
          })
          .catch(err => {
            res.send(err)
          })
    }

    static changeMovie(req,res){
        const body = req.body
        let phid ;
        if(req.body.ph == 'Walt Disney Studios'){
            phid = 1
        }
        if(req.body.ph == 'Pixar'){
            phid = 2
        }
        if(req.body.ph == 'Warner Bros'){
            phid = 3
        }
        if(req.body.ph == 'Universal Pictures'){
            phid = 4
        }
        if(req.body.ph == 'Paramount Picture'){
            phid = 5
        }

        body.name = body.name
        body.released_year = body.released_year
        body.genre = body.genre
        body.createdAt = new Date()
        body.updatedAt = new Date()
        body.productionHouseId = phid

        Movie.update(body,{ where: { id: req.params.id } })
        .then(()=>{
            res.redirect('/mv')
        })
        .catch(err=>{
            res.send(err)
        })

    }

    static destroyMovie(req,res){
        const id = req.params.id

        console.log(id)
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