const  { Cast, Movie, MovieCast } = require('../models')


class CastController {

    static show(req, res){
        // const alert = req.query
        Cast.findAll(
            { 
                include: [{model : Movie}]
            }
        )
        .then( data => {
            // res.send('Finally in Casts from Controller')
            res.send(data)
            // res.render('cast', {data})
        })
        .catch( () => {
            res.render('error')
        })
    }

    static valid(data){
        // const error = []
        // if(!data.name || !data.genre || !data.released_year){
        //     error.push('Please do not leave an empty data.')
        // }
        // else if(data.released_year > 2020){
        //     error.push('Invalid released year')
        // }
        // return error
    }

    static addPage(req, res){
        // const alert = req.query
        // ProductionHouse.findAll()
        // .then( data => {
        //     // res.send(data)
        //     res.render('add-cast', {data, alert})
        // })
        // .catch( () => {
        //     res.render('error')
        // })

    }

    static postAddPage(req, res){
        // const invalid = CastController.valid(req.body)
        // if(invalid.length > 0){
        //     res.redirect(`/casts/add?msg=${invalid.join(', ')}`)
        // } else {
        //     Cast.create({
        //         name: req.body.name,
        //         released_year: req.body.released_year,
        //         genre: req.body.genre,
        //         ProductionHouseId: req.body.ProductionHouseId
        //     })
        //     .then( () => {
        //         const msg = `Succesfully added new cast '${req.body.name}'`
        //         res.redirect(`/casts?msg=${msg}`)
        //     })
        //     .catch( () => {
        //         res.render('error')
        //     })
        // }
    }

    static editPage(req, res){
        // const alert = req.query
        // let newData
        // ProductionHouse.findAll()
        // .then( temp => {
        //     newData = temp
        //     return Cast.findByPk(Number(req.params.id))
        // })
        // .then( data => {
        //     res.render('edit-cast', {data, newData, alert})
        // })
        // .catch( () => {
        //     res.render('error')
        // })

    }

    static postEditPage(req, res){
        // const invalid = CastController.valid(req.body)
        // if(invalid.length > 0){
        //     res.redirect(`/casts/edit/${req.params.id}?msg=${invalid.join(', ')}`)
        // } else {
        //     Cast.update({
        //             name: req.body.name,
        //             released_year: req.body.released_year,
        //             genre: req.body.genre,
        //             ProductionHouseId : req.body.ProductionHouseId
        //     }, {
        //         where: {
        //             id: Number(req.params.id)  
        //         }
        //     })
        //     .then( () => {
        //         const msg = `Successfully edit selected cast.`
        //         res.redirect(`/casts?msg=${msg}`)
        //     })
        //     .catch( () => {
        //         res.render('error')
        //     })
        // }
    }

    static delete(req, res){
        // Cast.destroy({
        //     where:{
        //         id: Number(req.params.id)
        //     }
        // })
        // .then( () => {
        //     const msg = `Successfully delete selected cast.`
        //     res.redirect(`/casts?msg=${msg}`)
        // })
        // .catch( () =>{
        //     res.render('error')
        // })
    }
}

module.exports = CastController;