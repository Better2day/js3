const path = require('path');
const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// DB에 연결
const db = new sqlite3.Database('users.db', err => {
  if (err) {
    console.error('DB 연결 실패: ', err.message);
  } else {
    console.log('DB 연결 성공');
  }
});

app.use(express.json()) // Fetch로 처리해서 JSON 형태로 데이터를 전송했을 때
// app.use(express.urlencoded({ extended: false })); // Form 기본 전송
app.use(session({
  secret: 'this-is-servers-password',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000, // 세션 유효 시간을 60000ms = 60s(1분)
  }
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/profile', (req, res) => {
  // 이전에 세션에 저장한 정보 가져오기
  const { user } = req.session;

  if (user) {
    res.json({ username: user.username, message: '프로필 정보' });
  } else {
    res.status(401).json({ message: '로그인이 필요합니다.' });
  }
});

app.get('/check-login', (req, res) => {
  if (req.session && req.session.user) { // 로그인 세션 유효함
    return res.json({ id: req.session.user.id, username: req.session.user.username });
  }
  res.json({ username: null }); // 로그인 세션 없음
});

app.post('/login', (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  console.log(`사용자 입력값 확인: ${username}, ${password}`);

  // 사용자 로그인을 확인하는 코드 구현 (DB 사용자 정보)
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.error('DB 쿼리 오류:', err.message);
      res.status(500).json({ message: 'Server Error' });
    }

    if (row) {
      req.session.user = { id: row.id, username: row.username };
      res.json({ message: '로그인 성공' });
    } else {
      res.status(401).json({ message: ' 로그인 실패 (ID/PW를 확인해주세요' });
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.lerror('세션 삭제 실패', err);
      return res.status(500).json({ message: '로그아웃 실패' });
    }
    res.json({ message: '로그아웃 성공' });
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
