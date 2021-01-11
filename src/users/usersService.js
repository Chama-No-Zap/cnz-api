const User = require('./usersModel');

const createUserFunctions = {
  default: ({ phone, key, ...content }) => {
    const user = User
    .findOneAndUpdate({ phone },
      { $set: { [key]: content[key] } }, { runValidators: true }
    );
  // lidar com erro de user não encontrado
  return user;
  },
  phone: ({ phone, name }) =>  new User({ phone, name })
  ,
  cep: ({ phone, cep }) => {
    const user = User
      .findOneAndUpdate({ phone },
        { $set: { address: { cep } } }, { runValidators: true }
      );
    // lidar com erro de user não encontrado
    return user;
  },
};

const createUser = async (data) => {
  const { title, content } = data;
  if (title === 'phone') {
    const newUser = createUserFunctions[title](content);
    return newUser.save();
  }
  const user = createUserFunctions['default']({...content, key: title });
  return user.exec();
};

// const desativeUserByPhone = async (phone) => {
//   const user = await User.findOneAndUpdate({ phone }, { $set: { desatived: true } });
//   if (!user) return { err: true, message: 'User not found' };
//   return user.exec();
// };

// const getUserByPhone = async (phone) => {
//   const user = await User.findOne({ phone });
//   if (!user) return { err: true, message: 'User not found' };
//   return user;
// };

// const updateUserByPhone = async (data) => {
//   const { phone } = data;
//   const user = await getUserByPhone(phone);
//   if (user.err) return user;
//   const updateThat = Object.entries(data);
//   const updatedData = await Promise.all(updateThat.map(async ([key, value]) =>
//     User.findOneAndUpdate({ phone }, { $set: { [key]: value } })));
//   return { modified: updatedData.length, fields: data };
// };

module.exports = {
  createUser,
  // updateUserByPhone,
  // desativeUserByPhone,
  // getUserByPhone,
};
