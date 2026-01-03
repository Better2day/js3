const userModel = require('../models/userModel');

function getUsers({ name, gender, page }) {
  console.log('usreService.js → getUsers() 안');
  console.log('page: ', page);

  const users = userModel.getUsers({ page }); // 사용자 데이터 페이지 기본값: 첫 페이지
  if (!users) {
    throw new Error('User Not Found');
  }
  return users;
}

function getUserCount({ name, gender }) {
  const userCount = userModel.getUserCount({ name, gender });
  if (!userCount) {
    throw new Error('User Not Found');
  }
  return userCount;
}

module.exports = { getUsers, getUserCount };
