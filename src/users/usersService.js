const User = require('./usersModel');

const createUser = async (data) => {
  const user = new User(data);
  return user.save();
};

const updateUserByPhone = async (data) => {
  const { phone } = data;
  const updateThat = Object.entries(data);
  Promise.all(updateThat.forEach(async ([key, value]) => {
    await User.updateOne({ phone }, { $set: { [key]: value } });
  }));

  return { modified: 1, items: updateThat.length };
};

const desativeUserByPhone = async (phone) => {
  const user = await User.updateOne({ phone }, { $set: { desatived: true } });
  return user.exec();
};

const getUserByPhone = async (phone) => {
  const user = await User.findOne({ phone });
  if (!user) return { err: true, message: 'User not found' };
  return user;
};

module.exports = {
  createUser,
  updateUserByPhone,
  desativeUserByPhone,
  getUserByPhone,
};
