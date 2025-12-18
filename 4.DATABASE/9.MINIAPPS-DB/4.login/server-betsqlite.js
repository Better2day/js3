const path = require('path');
const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;
const db = new Database('users.db');

// DB 초기화 함수. 한 번만 실행할 거라서 함수명 없이 익명 즉시 실행 함수
(() => {
  db.exec(`CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
password TEXT
  )`);

  const insertStm = db.prepare('INSERT INTO users (username, password) VALUES(?, ?)');
  const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
    { username: 'user3', password: 'pass3' },
  ];
  // 시간 때문에 안 했는데, 테이블에서 select 쿼리를 하고 빈 테이블인지 확인 후 처리해야 함
  // for (const user of users) {
  //   insertStm.run(user.username, user.password);
  // }
})();

// Middleware
// Body Parser. URLEncdoed, JSON의 차이를 이해할 것!
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));

});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // DB에서 조회해서 로그인 허가 여부 결정
  const query = db.prepare('SELECT * FROM users WHERE username =? AND password =?');
  const user = query.get(username, password);

  // if (!user) {
  //   console.log('존재하지 않는 사용자입니다.');
  //   res.send({ success: false });
  // }
  if (user?.password == password) {
    res.send('로그인 성공');
  } else {
    res.send('로그인 실패');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
