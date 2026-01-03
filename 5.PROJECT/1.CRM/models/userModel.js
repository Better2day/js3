const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getUsers(page = 1) {
  const rows = db.prepare('SELECT * FROM users LIMIT 20 OFFSET ?').all((page - 1) * PAGE_SIZE);
  return rows;
}

function getUserCount() {
  const { userCount } = db.prepare('SELECT COUNT(Id) AS userCount FROM users').get();
  console.log('usreModel.js 안. userCount:');
  console.log(userCount);
  return userCount;
}

module.exports = { getUsers, getUserCount };
