const db = require('better-sqlite3')('mycrm.db');

function getUsers() {
  const row = db.prepare('SELECT * FROM users LIMIT 20').all();
  return row;
}

module.exports = { getUsers };
