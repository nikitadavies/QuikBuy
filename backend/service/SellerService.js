// services/sellerService.js
const { createStore, getStores } = require('../model/StoreModel');
const { createProduct, getProductsByStoreId } = require('../model/ProductModel');

const createSellerStore = async (store, image) => {
  return await createStore(store, image);
};

const createSellerProduct = async (product) => {
  return await createProduct(product);
};

const getSellerProducts = async (storeId) => {
  return await getProductsByStoreId(storeId);
};


const getStore = async () => {
  return await getStores();
};
module.exports = {
  createSellerStore,
  createSellerProduct,
  getSellerProducts,
  getStore
};
