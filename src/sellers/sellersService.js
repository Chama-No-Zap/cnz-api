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

const addProductByPhone = async (phone, products) => {
  const seller = await getSellerByPhone(phone);
  if (seller.err) throw new Error(seller.message);
  const { products: oldProductList } = await Seller.findOneAndUpdate({ phone }, { $push: { products } });
  return { actualProducts: [...oldProductList, ...products]};
}


const desativeSellerByPhone = async (phone) => {
  const seller = Seller.updateOne({ phone }, { $set: { desatived: true } });
  return seller.exec();
};

module.exports = { createSeller, updateSellerByPhone, desativeSellerByPhone, addProductByPhone };
