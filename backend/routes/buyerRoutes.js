// routes/buyerRoutes.js
const express = require('express');
const { getStores, getProducts, placeOrders, getOrders } = require('../controller/BuyerController');
const router = express.Router();

router.get('/stores', getStores);
router.get('/store/:storeId/products', getProducts);
router.post('/order', placeOrders);
router.get('/user/:userId/orders', getOrders);

module.exports = router;
