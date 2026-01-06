const path = require('path');
const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

// app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'this-is-servers-password',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000, // 세션 유효 시간을 60000ms = 60s(1분)
  }
}));

// app.use(express.static());

// 간단한 메모리 기반의 사용자 DB
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

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


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`사용자 입력값 확인: ${username}, ${password}`);
  // res.send({ username, password });

  const user = users.find(user => user.username == username && user.password == password);
  console.log('회원: ', (user ? user : '그런 회원이 없습니다'));

  // 사용자 로그인을 확인하는 코드 구현
  // 로그인 성공
  if (user) {
    req.session.user = { id: user.id, username: user.username, message: '프로필 정보' };
    res.json({ message: '로그인 성공' });
  }
  else {
    res.status(401).json({ message: '로그인 실패' });
  }
});

app.get('/logout', (req, res) => {
  // req.session.destroy(); // 제일 쉬운 코드. 이렇게만 처리해도 된다.

  req.session.destroy(err => {
    if (err) {
      console.error('세션 삭제 실패', err);
      return res.status(500).json({ message: '로그아웃 실패' });
    }
    res.json({});
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
