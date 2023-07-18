const User = require('./userModel');
const logger = require('./logger');

async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { createUser };
