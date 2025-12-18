const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = 3000;

const db = new sqlite3.Database('users.db');

// 초기화
function initDb() {
  // 테이블 생성과 데이터 삽입의 순서를 보장
  db.serialize(() => {
    // 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT
    )`);

    // 데이터 삽입
    const insertStm = db.prepare('INSERT INTO users (username, password) VALUES(?, ?)');
    insertStm.run('user1', 'pass1');
    insertStm.run('user2', 'pass2');
    insertStm.run('user3', 'pass3');
  });
}
// initDb();


// Middleware
app.use(express.urlencoded({ extended: false }));


// Routing
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // SQL Injection의 취약점이 되니 이렇게 하지 말 것!
  const malQueryStr = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  // const queryStr = 'SELECT * FROM users WHERE username=? AND password=?';
  console.log(malQueryStr);

  db.get(malQueryStr, (err, row) => {
    // db.get(queryStr, [username, password], (err, row) => {
    console.log('질의 결과: ', row)
    if (row) {
      res.send('로그인 성공');
    } else {
      res.send('로그인 실패');
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
