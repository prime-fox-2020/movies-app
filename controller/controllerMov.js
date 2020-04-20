const express = require('express')
const { Movie } = require('../models')
const { ProductionHouse } = require('../models') // utk edit

class controllerMovie {
    static showAll(request, respond) {
        let status = 'Unknown'
        Movie.findAll({
            include: [{ model: ProductionHouse }]
        },{order :[['released_year','DESC']]})
            .then(data => {
                // respond.send(data)
                respond.render('movies', { data, status })
            })
            .catch(err => {
                respond.render('err', { err })
            })
    }

    static add(request, respond) {
        respond.render('add_movies')
    }

    static postAdd(request, respond) {
        Movie.create({
            name: request.body.name,
            released_year: request.body.released_year,
            genre: request.body.genre,
        })
            .then(data => {
                respond.redirect('/movies')
            })
            .catch(err => {
                respond.render('err', { err })
            })

    }
    static edit(request, respond) {
        let findId = request.params.id
        let dataMovie
        return new Promise((resolve, reject) => {
            Movie.findAll({
                where: { id: findId }
            })
                .then(data => {
                    dataMovie = data
                    return ProductionHouse.findAll()
                })
                .then(dataProd => {
                    respond.render('edit_movies', { id: findId, dataMovie, dataProd })
                })
                .catch(err => {
                    respond.render('err', { err })
                })
        })
    }

    static postEdit(request, respond) {
        console.log(request.body)
        Movie.update({
            name: request.body.name,
            released_year: request.body.released_year,
            genre: request.body.genre,
            ProductionHouseId : request.body.PHid
        },
            { where: { id: Number(request.params.id) } },
            {include : [{model: ProductionHouse}]})
            .then(data => {
                respond.redirect('/movies')
            })
            .catch(err => {
                respond.render('err', { err })
            })
    }
    static delete(request,respond){
        Movie.destroy({
            where: {id : request.params.id}
        })
        .then(data=>{
            respond.redirect('/movies')
        })
        .catch(err=>{
            respond.render('err',{err})
        }        
        )
    }
}

module.exports = controllerMovie