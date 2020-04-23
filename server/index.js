const express = require('express')
const routes = require('../routers')
const parser = require('body-parser')
const server = new express()

class WebServer {
    static loadServer() {
        server.use(parser.urlencoded({extended: true}))
        server.use(parser.json())
        server.set('view engine', 'ejs')
        server.use('/', routes)
        server.listen(3000, () => 'oalaaah cuiyyy lemottt !!')
    }
}

module.exports = WebServer