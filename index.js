const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./src/users/usersController');
const sellersRouter = require('./src/sellers/sellersController');
// const productsRouter = require('./src/products/productsController');

const app = express();

mongoose.connect('mongodb://localhost/cnz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.json());

app.use('/users', usersRouter);
// app.use('/products', productsRouter);


app.use('/sellers', sellersRouter);
// app.use();

app.listen(3000, () => console.log('listen to port 3000'));
