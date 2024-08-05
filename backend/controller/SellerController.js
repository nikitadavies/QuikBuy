// controllers/sellerController.js
const { createSellerStore, createSellerProduct, getSellerProducts, getStore } = require('../service/SellerService');

const createStore = async (req, res) => {
  try {
    const { store, image } = req.body; // assuming image is sent as base64 encoded string
    const newStore = await createSellerStore(store, image);
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await createSellerProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await getSellerProducts(req.params.storeId);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllStore = async (req, res) => {
  try {
    const stores = await getStore();
    res.status(200).json(stores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createStore,
  createProduct,
  getProducts,
  getAllStore
};
