const express = require('express');
const app = express();
const PORT = 3000;

// 서버 사이드 렌더링을 하기 위한 라이브러리 설정
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // res.send('<h1>안녕</h1>');
  // res.render('index', { title: 'Express App', message: 'EJS를 사용해서 Server-side Rendering 중입니다.' });
  res.render('index', { title: '내 타이틀', message: '내가 쓰고 싶은 메시지' });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
