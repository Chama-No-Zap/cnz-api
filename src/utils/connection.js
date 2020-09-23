const mongoose = require('mongoose');

const connection = async () =>
  mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

module.exports = connection;
