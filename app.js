const express = require('express');
const app = express();
const router = require('./router');

const port = 3000;

app.set('view engine', 'ejs');

app.use(router);

app.listen(port, () => console.log(`App running on port ${port}`));