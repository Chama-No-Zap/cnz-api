const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./src/users/usersController');
const sellersRouter = require('./src/sellers/sellersController');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/cnz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.use('/sellers', sellersRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listenning on PORT ${PORT}`));
