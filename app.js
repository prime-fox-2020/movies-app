const express = require('express')
const routers = require('./routers')

const app = express()
const PORT = 3000

const locals = (req, res, next) => {
  res.locals = {
    title: 'Movie App',
    pageTitle: '',
    page: '',
    alert: {
      message: [],
      type: null
    }
  }
  next()
}

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(locals)
app.use(routers)

app.listen(PORT, () => console.log('server on port:', PORT))