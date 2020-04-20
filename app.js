const express = require('express');
const app = express();

const port = 3000;
const {ProductionHouse, Movie} = require('./models');

app.get('/', (req, res) => {
  ProductionHouse.findAll()
  .then(data => res.send(data))
  .catch(err => res.send(err))
})

app.listen(port, () => console.log(`App running on port ${port}`));