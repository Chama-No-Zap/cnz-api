const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./src/users/usersController');
const errorHandler = require('./src/middlewares/errorHandler');
require('dotenv/config');
// const sellersRouter = require('./src/sellers/sellersController');

const app = express();
const PORT = process.env.BACK_PORT || 9000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/cnz';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.json());

app.use('/users', usersRouter);

// app.use('/sellers', sellersRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listenning on PORT ${PORT}`));
