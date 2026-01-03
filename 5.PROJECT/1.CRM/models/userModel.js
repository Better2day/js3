const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

function getUsers({ name, gender, page = 1 }) {
  console.log('usreModel.js → getUsers() 안');
  console.log('page: ', page);
  console.log('name: ', name);
  console.log('gender: ', gender);

  const rows = db.prepare(`
    SELECT *
      FROM users
     WHERE name LIKE ?
     LIMIT 20
     OFFSET ?
     `).all(`%${name}%`, (page - 1) * PAGE_SIZE);
  //  `).all(name, (page - 1) * PAGE_SIZE);

  console.log(rows);

  // WHERE name LIKE '%?%'
  //  AND gender = ?

  // `).all(name, gender, (page - 1) * PAGE_SIZE);

  return rows;
}

function getUserCount({ name, gender }) {
  // const { userCount } = db.prepare('SELECT COUNT(Id) AS userCount FROM users').get();
  const { userCount } = db.prepare(`
    SELECT COUNT(Id) AS userCount
      FROM users
      WHERE name LIKE ?
     `).get(`%${name}%`);
  //  `).get(name);
  // WHERE name LIKE '%?%'
  //  AND gender = ?

  console.log('usreModel.js → getUserCount() 안');
  console.log('userCount: ', userCount);
  return userCount;
}

module.exports = { getUsers, getUserCount };
