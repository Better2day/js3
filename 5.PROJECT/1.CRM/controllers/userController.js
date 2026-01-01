const userService = require('../services/userService');

function getUsers(req, res) {
  try {
    const users = userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error: ', err);
  }
}

function getUserCount(req, res) {
  try {
    const userCount = userService.getUserCount();
    res.json(userCount);
  } catch (err) {
    res.status(500).send('Server error: ', err);
  }
}

module.exports = { getUsers, getUserCount };
