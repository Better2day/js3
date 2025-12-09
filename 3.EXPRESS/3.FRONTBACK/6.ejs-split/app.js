const express = require('express');
const app = express();
const PORT = 3000;

// 서버 사이드 렌더링을 하기 위한 라이브러리 설정
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    title: '내 타이틀 3', message: '내가 쓰고 싶은 메시지 3'
  };
  res.render('main', data);
});

app.get('/user', (req, res) => {
  const data = {
    title: '사용자 페이지', message: '분할된 헤더와 또 다른 메인 합치기'
  };
  res.render('user', data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
