// controllers/authController.js
const { register, login, confirmUser } = require('../service/AuthService');

const registerUser = async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const confirmUserRegistration = async (req, res) => {
  try {
    const { email, confirmationCode } = req.body;
    await confirmUser(email, confirmationCode);
    res.status(200).json({ message: 'User confirmed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  confirmUserRegistration
};
