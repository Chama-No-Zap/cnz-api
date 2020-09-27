const User = require('./schemas');

const createUser = async(data) => {
  const user = new User(data);
  return user.save();
}

const updateUserByPhone = async(data) => {
  const { phone } = data;
  const user = User.updateOne({ phone }, { $set: data });
  return user.exec();
}

const desativeUserByPhone = async(phone) => {
  const user = new User.updateOne({ phone }, { $set: { desatived: true } });
  return user.exec();
}

module.exports = { createUser, updateUserByPhone, desativeUserByPhone };
