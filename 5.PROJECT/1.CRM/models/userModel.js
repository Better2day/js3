const db = require('better-sqlite3')('mycrm.db');

function getUsers() {
  const rows = db.prepare('SELECT * FROM users LIMIT 20').all();
  return rows;
}

function getUserCount() {
  const { userCount } = db.prepare('SELECT COUNT(Id) AS userCount FROM users').get();
  console.log('usreModel.js 안. userCount:');
  console.log(userCount);
  return userCount;
}

module.exports = { getUsers, getUserCount };
