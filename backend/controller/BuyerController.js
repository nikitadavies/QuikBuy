// controllers/buyerController.js
const { viewStores, viewProductsByStore, placeOrder, getBuyerOrders, getProductByIdForBuyer, viewProducts } = require('../service/BuyerService');

const getStores = async (req, res) => {
  try {
    const stores = await viewStores();
    res.status(200).json(stores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await viewProductsByStore(req.params.storeId);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await viewProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await getProductByIdForBuyer(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const placeOrders = async (req, res) => {
  try {
    const order = await placeOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await getBuyerOrders(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getStores,
  getProducts,
  placeOrders,
  getOrders,
  getProduct,
  getAllProducts
};
