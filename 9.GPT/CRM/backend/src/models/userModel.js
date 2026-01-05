
import { db } from './db.js';

export function getUsers(limit, offset) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM users ORDER BY Name LIMIT ? OFFSET ?',
      [limit, offset],
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });
}

export function countUsers() {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(*) as cnt FROM users', (err, row) =>
      err ? reject(err) : resolve(row.cnt)
    );
  });
}
