const userModel = require('../models/userModel');

function getUsers() {
  const users = userModel.getUsers();
  if (!users) {
    throw new Error('User Not Found');
  }
  return users;
}

module.exports = { getUsers };
