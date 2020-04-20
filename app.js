const express = require('express')
const app = express()

const port = 3000
const productionRoutes = require('./routes/production-routes.js')
const movieRoutes = require('./routes/movie-routes.js')


app.listen(port, ()=>{
    console.log(`App Online. Listening on ${port}`)
})
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.get('/',(request,respond)=>{
    respond.render('home')
}) //for home page
app.use(productionRoutes)
app.use(movieRoutes)