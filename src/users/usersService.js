const UsersModel = require('./usersModel.js');

const createUser = async(data) =>
  UsersModel.createUser(data);


module.exports = { createUser };
