// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, confirmUserRegistration } = require('../controller/AuthController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/confirm', confirmUserRegistration);

module.exports = router;
