const UsersModel = require('./usersModel.js');

const createUser = async(data) => {
  const { cpf, phone } = data;
  const regex = new RegExp(/[^\d]+/g);
  const onlyNumbersCpf = cpf.replace(regex, '');
  const onlyNumbersPhone = phone.replace(regex,'');
  return UsersModel.createUser({ ...data, cpf: onlyNumbersCpf, phone: onlyNumbersPhone });
}


module.exports = { createUser };
