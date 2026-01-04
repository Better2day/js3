const db = require('better-sqlite3')('mycrm.db');

const PAGE_SIZE = 20;

// 사용자 목록
function getUsers({ name, gender, page = 1 }) {
  const rows = db.prepare(`
    SELECT *
    FROM users
    WHERE name LIKE ?
    AND gender LIKE ?
    LIMIT ?
    OFFSET ?
    `).all(`%${name}%`, `${gender}%`, PAGE_SIZE, (page - 1) * PAGE_SIZE);

  return rows;
}

function getUserCount({ name, gender }) {
  const { userCount } = db.prepare(`
      SELECT COUNT(Id) AS userCount
      FROM users
      WHERE name LIKE ?
      AND gender LIKE ?
      `).get(`%${name}%`, `${gender}%`);

  return userCount;
}

// 사용자 상세
function getUserDetail({ id }) {
  console.log('userModel.js → getUserDetail() 안');

  const row = db.prepare(`
    SELECT *
    FROM users
    WHERE Id = ?
    `).get(id);

  console.log(row);
  return row;
}

module.exports = { getUsers, getUserCount, getUserDetail };
