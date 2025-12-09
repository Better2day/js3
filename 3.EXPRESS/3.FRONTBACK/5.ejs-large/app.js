const express = require('express');
const app = express();
const PORT = 3000;

// 서버 사이드 렌더링을 하기 위한 라이브러리 설정
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // res.send('<h1>안녕</h1>');
  // res.render('index', { title: 'Express App', message: 'EJS를 사용해서 Server-side Rendering 중입니다.' });
  res.render('index', { title: '내 타이틀', message: '내가 쓰고 싶은 메시지' });
});

app.get('/fruits', (req, res) => {
  // res.send('<h1>과일 목록</h1><ul><li>과일1</li><li>과일2</li></ul>')
  const fruits = ['사과', '배', '귤', '오렌지', '복숭아'];
  res.render('fruits', { fruits: fruits });
});

app.get('/welcome', (req, res) => {
  const isAdmin = false;

  if (isAdmin) {
    username = '관리자';
  } else {
    username = '홍길동';
  }

  res.render('welcome', { username });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
