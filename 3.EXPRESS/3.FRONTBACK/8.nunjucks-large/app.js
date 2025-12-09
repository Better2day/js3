const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 3000;

app.set('view engine', 'njk');

nunjucks.configure('views', {
  autoescape: true, // XSS를 자동 대응하기 위한 설정
  express: app, // express와 연동
  watch: true // 개발용 옵션. 템플릿 파일의 변경을 자동 감지
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Express app', message: 'NJK를 사용해서 SSR 하는 중' });
  // res.render('index.html', { title: 'Express app', message: 'NJK를 사용해서 SSR 하는 중' });
  // 위 app.set('view engine', 'njk'); 부분을 주석 처리하고, njk의 파일명 (확장자 제외) 대신 index.html 같은 html을 인자로 줘도 똑같이 작동한다고 한다. 
});

app.get('/fruits', (req, res) => {
  const fruits = ['사과', '배', '귤', '오렌지', '복숭아'];
  res.render('fruits', { title: '과일 목록', fruits: fruits });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
