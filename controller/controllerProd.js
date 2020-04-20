const express = require('express')
const {ProductionHouse} = require('../models')
class controllerProduction{
    static show(request,respond){
        ProductionHouse.findAll()
        .then(data=>{
            respond.render('production',{data})
        })
        .catch(err=>{
            respond.render('err',{err})
        })
    }
}

module.exports = controllerProduction