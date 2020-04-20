const express = require('express')
const app = new express()
const port = 3000
const Router = require('./route/router')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:true }))
app.use('/', Router)


app.listen(port,()=>{
    console.log(`starting at server ${port}`);
})
