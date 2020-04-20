const express = require('express');

const app = express();

const port = 3000;

const routes = require('./routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.use(routes);

const {Movie, ProductionHouse} = require('./models')
app.get('/mama', (req,res)=>{
  Movie.findAll({
    include: [{model: ProductionHouse}]
  })
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send(err)
  })
})

app.listen(port, ()=>{
  console.log(`We are about to launch an app on port ${port}`)
})