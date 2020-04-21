const express = require('express')
const routers = require('./routers')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended:true }))
app.set('view engine','ejs')
app.use('/', routers)

app.listen(port, ()=> {
    console.log(`App is listening to port ${port}`)
})
