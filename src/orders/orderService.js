const Order = require('./ordersModel');


const createOrder = async (data) => {
  const order = new Order(data);
  return order.save();
};

const getOrders = async (value) => {
  const order = await Order.find(value);
  if (order.length === 0) return { err: true, message: 'Order not found', status: 404 };
  return order;
};

const updateOrder = async (data) => {
  const { _id } = data;
  const seller = await getOrders({ _id });
  if (seller.err) return seller;
  const updateThat = Object.entries(data);
  const updatedData = await Promise.all(updateThat.map(async ([key, value]) =>
    Order.findOneAndUpdate({ _id }, { $set: { [key]: value } })));
  return { modified: updatedData.length, fields: data };
};

const cancelOrder = async (value) => {
  const order = await Order.findOneAndDelete(value);
  if (!order) return { err: true, message: 'Order not found', status: 404 };
  return order;
};

module.exports = { createOrder, getOrders, updateOrder, cancelOrder };
