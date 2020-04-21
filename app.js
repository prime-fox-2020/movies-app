const express = require('express');

const app = express();

const port = 3100;

const routes = require('./routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.use(routes);

const {Movie, ProductionHouse, Cast} = require('./models')
app.get('/mama', (req,res)=>{
  ProductionHouse.findAll({
    include: [{model: Movie}]
  })
  .then(data=>{
     console.log(data)
    res.send(data)
  })
  .catch(err=>{
    res.send(err)
  })
})

app.listen(port, ()=>{
  console.log(`We are about to launch an app on port ${port}`)
})