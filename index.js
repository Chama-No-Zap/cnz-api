const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./src/users/usersController');
const sellersRouter = require('./src/sellers/sellersController');
const ordersRouter = require('./src/orders/ordersController');
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

app.use('/orders', ordersRouter);

app.use((err, _req, res, _next) => {
  const { message, status } = err;
  if (status < 500) {
    return res.status(status).json({ message });
  }
  res.status(500).send('Something broke!');
})

app.listen(3000, () => console.log('listen to port 3000'));
