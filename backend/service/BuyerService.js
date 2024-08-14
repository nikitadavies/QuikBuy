// services/buyerService.js
const { getStores } = require('../model/StoreModel');
const { getProductsByStoreId, getProductById, getAllProducts } = require('../model/ProductModel');
const { createOrder, getOrdersByUserId } = require('../model/OrderModel');

const viewStores = async () => {
  return await getStores();
};

const viewProductsByStore = async (storeId) => {
  return await getProductsByStoreId(storeId);
};

const getProductByIdForBuyer = async (productId) => {
  return await getProductById(productId);
};

const placeOrder = async (order) => {
  return await createOrder(order);
};

const getBuyerOrders = async (userId) => {
  return await getOrdersByUserId(userId);
};

const viewProducts = async () => {
  return await getAllProducts();
};

module.exports = {
  viewStores,
  viewProductsByStore,
  placeOrder,
  getBuyerOrders,
  getProductByIdForBuyer,
  viewProducts
};
