const Seller = require('./sellersModel');

const createSeller = async (data) => {
  const seller = new Seller(data);
  return seller.save();
};

const updateSellerByPhone = async (data) => {
  const { phone } = data;
  const updateThat = Object.entries(data);
  try {
    updateThat.forEach(([key, value]) => {
      Seller.updateOne({ phone }, { $set: { [key]: value } });
    });
    return { modified: 1, items: updateThat.length };
  } catch (err) {
    console.error(err);
  }
};

const desativeSellerByPhone = async (phone) => {
  const seller = Seller.updateOne({ phone }, { $set: { desatived: true } });
  return seller.exec();
};

module.exports = { createSeller, updateSellerByPhone, desativeSellerByPhone };
