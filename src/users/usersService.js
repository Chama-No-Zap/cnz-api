const UsersModel = require('./usersModel.js');

const createUser = async (data) => UsersModel.createUser(data);
const updateUserByPhone = async (data) => UsersModel.updateUserByPhone(data);

const desativeUserByPhone = async (phone) => UsersModel.desativeUserByPhone(phone);

module.exports = { createUser, updateUserByPhone, desativeUserByPhone };
