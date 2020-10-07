const User = require('./usersModel');

const createUser = async (data) => {
  const user = new User(data);
  return user.save();
};

const desativeUserByPhone = async (phone) => {
  const user = await User.findOneAndUpdate({ phone }, { $set: { desatived: true } });
  if (!user) return { err: true, message: 'User not found' };
  return user.exec();
};

const getUserByPhone = async (phone) => {
  const user = await User.findOne({ phone });
  if (!user) return { err: true, message: 'User not found' };
  return user;
};

const updateUserByPhone = async (data) => {
  const { phone } = data;
  const user = await getUserByPhone(phone);
  if (user.err) return user;
  const updateThat = Object.entries(data);
  const updatedData = await Promise.all(updateThat.map(async ([key, value]) =>
     User.findOneAndUpdate({ phone }, { $set: { [key]: value } })
  ));

  return { modified: updatedData.length, fields: data };
};

module.exports = {
  createUser,
  updateUserByPhone,
  desativeUserByPhone,
  getUserByPhone,
};
