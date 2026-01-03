const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getUsers({ name, gender, page = 1 }) {
  console.log('usreModel.js → getUsers() 안');
  console.log('page: ', page);
  const rows = db.prepare('SELECT * FROM users LIMIT 20 OFFSET ?').all((page - 1) * PAGE_SIZE);
  return rows;
}

function getUserCount({ name, gender }) {
  const { userCount } = db.prepare('SELECT COUNT(Id) AS userCount FROM users').get();
  console.log('usreModel.js → getUserCount() 안');
  console.log('userCount: ', userCount);
  return userCount;
}

module.exports = { getUsers, getUserCount };
