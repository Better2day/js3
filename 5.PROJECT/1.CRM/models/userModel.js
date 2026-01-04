const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getUsers({ name, gender, page = 1 }) {
  // console.log('usreModel.js → getUsers() 안');
  // console.log('page: ', page);
  // console.log('name: ', name);
  // console.log('gender: ', gender);

  const rows = db.prepare(`
    SELECT *
    FROM users
    WHERE name LIKE ?
    AND gender LIKE ?
    LIMIT ?
    OFFSET ?
     `).all(`%${name}%`, `${gender}%`, PAGE_SIZE, (page - 1) * PAGE_SIZE);

  console.log(rows);

  return rows;
}

function getUserCount({ name, gender }) {
  const { userCount } = db.prepare(`
    SELECT COUNT(Id) AS userCount
    FROM users
    WHERE name LIKE ?
    AND gender LIKE ?
     `).get(`%${name}%`, `${gender}%`);

  console.log('usreModel.js → getUserCount() 안');
  console.log('userCount: ', userCount);
  return userCount;
}

module.exports = { getUsers, getUserCount };
