const User = require('./usersModel');
const {
  USER_NOT_FOUND,
} = require('../errors');

const createUserFunctions = {
  default: async ({ phone, key, ...content }) => {
    const user = await User
    .findOneAndUpdate({ phone },
      { $set: { [key]: content[key] } }, { runValidators: true }
    );
    return user;
  },
  phone: ({ phone = null, name }) => {
    const user = new User({ phone, name });
    return user.save();
  }
  ,
  address: async ({ phone, key, ...content }) => {
    const user = await User
      .findOneAndUpdate({ phone },
        { $set: { [`address.${key}`]: content[key] } },
        { runValidators: true }
      );
    return user;
  },
};

const createUser = async (data) => {
  const { title, content } = data;
  let user;
  const addressElements = ['cep', 'complement', 'number'];
  if (title === 'phone') {
    user = await createUserFunctions[title](content);
  }

  else if (addressElements.some((elem) => elem === title)) {
    // utilizar função de atualizar endereço caso a chave seja
    // cep, complemento ou número
    user = await createUserFunctions['address']({...content, key: title });
  } else {
    user = await createUserFunctions['default']({...content, key: title });
  }
  if (!user) throw USER_NOT_FOUND;
  return user;
};

const getUserByPhone = async (data) => {
  const { title, content: { phone } } = data;
  const user = await User.findOne({ phone });
  if (!user) throw USER_NOT_FOUND;
  return user;
};

// const getUserByInfo = async (data) => {
//   const { title, content: { phone } } = data;
//   const user = await User.findOne({ phone, [title]: title });
//   if (!user) throw USER_NOT_FOUND;
//   return user;
// };

module.exports = {
  createUser,
  getUserByPhone,
};
