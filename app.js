'use strict'

const routes  = require('./routes')
const express = require('express')
const app     = express()
const port    = 3000 || process.env.PORT


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.listen(port, () => console.log('server is started'))