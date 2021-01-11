const Seller = require('./sellersModel');

const getSellerByPhone = async (phone) => {
  const seller = await Seller.findOne({ phone });
  if (!seller) return { err: true, message: 'Seller not found' };
  return seller;
};

const createSeller = async (data) => {
  const seller = new Seller(data);
  return seller.save();
};

// const updateSellerByPhone = async (data) => {
//   const { phone } = data;
//   const updateThat = Object.entries(data);
//   try {
//     updateThat.forEach(([key, value]) => {
//       Seller.updateOne({ phone }, { $set: { [key]: value } });
//     });
//     return { modified: 1, items: updateThat.length };
//   } catch (err) {
//     console.error(err);
//   }
// };

const updateSellerByPhone = async (data) => {
  const { phone } = data;
  const seller = await getSellerByPhone(phone);
  if (seller.err) return seller;
  const updateThat = Object.entries(data);
  const updatedData = await Promise.all(updateThat.map(async ([key, value]) =>
    Seller.findOneAndUpdate({ phone }, { $set: { [key]: value } })));
  return { modified: updatedData.length, fields: data };
};

const desativeSellerByPhone = async (phone) => {
  const seller = Seller.updateOne({ phone }, { $set: { desatived: true } });
  return seller.exec();
};

const addProductByPhone = async (phone, products) => {
  const seller = await getSellerByPhone(phone);
  if (seller.err) throw new Error(seller.message);
  const { products: oldProductList } = await Seller.findOneAndUpdate({ phone }, { $push: { products } });
  return { actualProducts: [...oldProductList, ...products]};
};

// Buscar produtos -- Função alternativa
// const getProductByName = async (phone, productName) => {
//   const { products } = await getSellerByPhone(phone);
//   const product = products.find(({ name }) => name === productName);
//   if (!product ) return { err: true, message: 'Product not found' };
//   return product[0];
// };

const getProductByName = async (phone, name) => {
  const product = await Seller.aggregate([
    { $match: { phone } },
    { $project: {
      product: { $filter: {
        input: '$products',
        as: 'product',
        cond: { $eq: ['$$product.name', name ]}
      }},
      _id: 0
    }}
  ]);

  // if () throw new Error('Product not found');
  return product[0];
};

const getAllProductsByPhone = async (phone) => {
  const products = await Seller.find({ phone }, { products: 1, _id: 0 });
  return products[0];
};

const desactiveProductByName = async (_phone, _productName) => {
  return null;
};

// const removeProductByName = async (phone, name) => {
//   const { products } = await Seller.findOneAndUpdate({ phone }, { $pull: { "products.name": name } });
//   return { removedProduct: name };
// }



module.exports = {
  createSeller,
  updateSellerByPhone,
  desativeSellerByPhone,
  addProductByPhone,
  getProductByName,
  desactiveProductByName,
  getAllProductsByPhone,
};
