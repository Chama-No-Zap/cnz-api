const User = require('./schemas');

const createUser = async (data) => {
  const user = new User(data);
  return user.save();
}

const updateUserByPhone = async (data) => {
  const { phone } = data;
  const updateThat = Object.entries(data);
  try {
    updateThat.forEach(([key, value]) => {
      User.updateOne({ phone }, { $set: { [key]: value } });
    });
    return { modified: 1, items: updateThat.length }
  } catch (err) {
    console.error(err);
  }

}

const desativeUserByPhone = async(phone) => {
  const user = User.updateOne({ phone }, { $set: { desatived: true } });
  return user.exec();
}

module.exports = { createUser, updateUserByPhone, desativeUserByPhone };
