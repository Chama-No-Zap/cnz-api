// const Product = require('./productsModel');

// const createProduct = async (data) => {
//   const product = new Product(data);
//   return product.save();
// };

// // const updateProductById = async (id) => {
// //   const user = await getUserByPhone(phone);
// //   if (user.err) return user;
// //   const updateThat = Object.entries(data);
// //   const updatedData = await Promise.all(updateThat.map(async ([key, value]) => {
// //     return User.findOneAndUpdate({ phone }, { $set: { [key]: value } });
// //   }));

// //   return { modified: updatedData.length, fields: data };
// // };

// // const desativeUserByPhone = async (phone) => {
// //   const user = await User.findOneAndUpdate({ phone }, { $set: { desatived: true } });
// //   if (!user) return { err: true, message: 'User not found' };
// //   return user.exec();
// // };

// const getProductById = async (id) => {
//   const product = await Product.findOne({ id });
//   if (!product) return { err: true, message: 'Product not found' };
//   return product;
// };

// module.exports = {
//   createProduct,
//   getProductById,
// };
