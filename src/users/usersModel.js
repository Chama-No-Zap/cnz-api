const User = require('./schemas');

const createUser = async(data) => {
  const user = new User(data);
  return user.save();
}

module.exports = { createUser };
