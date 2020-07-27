const express = require('express')
const { Cast , Movie, Cast_Movie} = require('../models')
const countYear = require('../helpers/countYear')
class ControllerCast {
    static findAll(request, respond) {
        Cast.findAll()
            .then(data => {
                // console.log(data)
                respond.render('casts', { data })
            })
            .catch(err => {
                respond.render('err', { err })
            })
    }
    static add(request, respond) {
        respond.render('add_casts')
    }
    static addPost(request, respond) {
        // respond.send(request.body)
        Cast.create({
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            phone_number: request.body.phone_number,
            birth_year: request.body.birth_year,
            gender: request.body.gender
        })
            .then(data => {
                respond.redirect('/casts')
            })
            .catch(err => {
                respond.render('err', { err })
            })
    }
    static edit(request, respond) {
        const findId = Number(request.params.id)
        Cast.findAll({
            where: { id: findId }
        })
            .then(data => {
                // console.log(data[0].first_name)
                respond.render('edit_casts', { data, id: findId })
            })
            .catch(err => {
                respond.render('err', { err })
            })

    }

    static editPost(request, respond) {
        console.log(Number(request.params.id))
        const findId = request.params.id
        // respond.send(request.body)
        Cast.update({
            first_name : request.body.first_name,
            last_name: request.body.last_name,
            phone_number: request.body.phone_number,
            birth_year: request.body.birth_year,
            gender: request.body.gender
            },
            {
                where: { id: findId }
            })
            .then(data=>{
                respond.redirect('/casts')
            })
            .catch(err=>{
                respond.render('err',{err})
            })
    }
    static delete(request, respond) {
        Cast.destroy({
            where: {id:request.params.id}
        })
        .then(data=>{
            respond.redirect('/casts')
        })
        .catch(err=>{
            respond.render('err',{err})
        })
    }
    static seeMovie(request, respond){
        Cast.findByPk(Number(request.params.id),
        {include:
            [{model : Movie}]
        })
        .then(data=>{
            respond.render('view_cast_movie',{ data , countYear })
        })
        .catch(err=>{
            respond.render('err',{err})
        })
    }
}

module.exports = ControllerCast