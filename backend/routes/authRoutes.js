// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, confirmUserRegistration, getUserByEmail } = require('../controller/AuthController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/confirm', confirmUserRegistration);
router.get('/users/:emailId', getUserByEmail);

module.exports = router;
