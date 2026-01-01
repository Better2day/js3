const userModel = require('../models/userModel');

function getUsers() {
  const users = userModel.getUsers();
  if (!users) {
    throw new Error('User Not Found');
  }
  return users;
}

function getUserCount() {
  const userCount = userModel.getUserCount();
  if (!userCount) {
    throw new Error('User Not Found');
  }
  return userCount;
}

module.exports = { getUsers, getUserCount };
