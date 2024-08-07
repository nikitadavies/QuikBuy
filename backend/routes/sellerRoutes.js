// routes/sellerRoutes.js
const express = require('express');
const { createStore, createProduct, getProducts, getAllStore } = require('../controller/SellerController');
const router = express.Router();

router.post('/store', createStore);
router.post('/product', createProduct);
router.post('/product', createProduct);
router.get('/store/:storeId/products', getProducts);
router.get('/store', getAllStore);

module.exports = router;
