// controllers/authController.js
const { register, login, confirmUser, getUserByEmailDetail } = require('../service/AuthService');

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

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.emailId;
    const user = await getUserByEmailDetail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  confirmUserRegistration,
  getUserByEmail
};
