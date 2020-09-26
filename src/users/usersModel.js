const User = require('./schemas');

const createUser = async(data) => {
  const user = new User(data);
  return user.save();
}

const updateUserByPhone = async(data) => {
  const { phone } = data;
  const user = User.update({ phone }, { $set: data });
  return user.exec();
}

module.exports = { createUser, updateUserByPhone };
