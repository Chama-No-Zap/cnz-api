const User = require('./schemas');

const createUser = async (data) => {
  const user = new User(data);
  return user.save();
}

const updateUserByPhone = async (data) => {
  const { phone } = data;
  const updateThat = Object.entries(data);
  let user;
  updateThat.map(([key, value]) => {
    user = User.updateOne({ phone }, { $set: { [key]: value } });
    return [user.exec()]
  });
  return user.exec();

}

const desativeUserByPhone = async(phone) => {
  const user = User.updateOne({ phone }, { $set: { desatived: true } });
  return user.exec();
}

module.exports = { createUser, updateUserByPhone, desativeUserByPhone };
