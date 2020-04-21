const express = require('express');
const router = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/', router);

app.listen(PORT, () => console.log('Server hosted on:', PORT));