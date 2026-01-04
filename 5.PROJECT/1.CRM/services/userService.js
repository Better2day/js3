const userModel = require('../models/userModel');

// 사용자 목록
function getUsers({ name, gender, page }) {
  const users = userModel.getUsers({ name, gender, page }); // 사용자 데이터 페이지 기본값: 첫 페이지
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

// 사용자 상세
function getUserDetail({ id }) {
  console.log('useeService.js → getUserDetail() 안');
  const user = userModel.getUserDetail({ id });
  if (!user) {
    throw new Error('User Not Found');
  }
  return user;
}

module.exports = { getUsers, getUserCount, getUserDetail };
