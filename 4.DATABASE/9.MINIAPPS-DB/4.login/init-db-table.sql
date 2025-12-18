-- sqlite3 users.db < init-db-table.sql 처럼 사용 가능

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT
);
