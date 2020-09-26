const UsersModel = require('./usersModel.js');
const removeSpecialsCharacters = require('../utils/removeSpecialsCharacters');

const createUser = async(data) => UsersModel.createUser(removeSpecialsCharacters(data));
const updateUserByPhone = async(data) => UsersModel.updateUserByPhone(removeSpecialsCharacters(data));

module.exports = { createUser, updateUserByPhone };
