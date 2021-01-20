const Seller = require('./sellersModel');
const {
  USER_NOT_FOUND,
} = require('../errors');

const createSellerFunctions = {
  default: async ({ phone, key, ...content }) => {
    const seller = await Seller
    .findOneAndUpdate({ phone },
      { $set: { [key]: content[key] } }, { new: true, runValidators: true, }
    );
    return seller;
  },
  phone: ({ phone = null, name }) => {
    const seller = new Seller({ phone, name });
    return seller.save();
  }
  ,
  address: async ({ phone, key, ...content }) => {
    const seller = await Seller
      .findOneAndUpdate({ phone },
        { $set: { [`address.${key}`]: content[key] } },
        { runValidators: true, new: true }
      );
    return seller;
  },
};

const createSeller = async (data) => {
  const { title, content } = data;
  let seller;
  const addressElements = ['cep', 'complement', 'number', 'nextMessage'];
  if (title === 'phone') {
    seller = await createSellerFunctions[title](content);
  }

  else if (addressElements.some((elem) => elem === title)) {
    // utilizar função de atualizar endereço caso a chave seja
    // cep, complemento ou número
    seller = await createSellerFunctions['address']({...content, key: title });
  } else {
    seller = await createSellerFunctions['default']({...content, key: title });
  }
  if (!user) throw USER_NOT_FOUND;
  return user;
};

const getSellerByPhone = async (data) => {
  const { title, content: { phone } } = data;
  const seller = await Seller.findOne({ phone });
  if (!seller) throw USER_NOT_FOUND;
  return seller;
};

const getSellerByInfo = async (data) => {
  const { title, content: { phone } } = data;
  const seller = await Seller.findOne({ phone, [title]: title });
  if (!seller) throw USER_NOT_FOUND;
  return seller;
};

module.exports = {
  createSeller,
  getSellerByPhone,
  getSellerByInfo,
};
