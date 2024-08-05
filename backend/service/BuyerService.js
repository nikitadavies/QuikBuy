// services/buyerService.js
const { getStores } = require('../model/StoreModel');
const { getProductsByStoreId } = require('../model/ProductModel');
const { createOrder, getOrdersByUserId } = require('../model/OrderModel');

const viewStores = async () => {
  return await getStores();
};

const viewProductsByStore = async (storeId) => {
  return await getProductsByStoreId(storeId);
};

const placeOrder = async (order) => {
  return await createOrder(order);
};

const getBuyerOrders = async (userId) => {
  return await getOrdersByUserId(userId);
};

module.exports = {
  viewStores,
  viewProductsByStore,
  placeOrder,
  getBuyerOrders,
};
