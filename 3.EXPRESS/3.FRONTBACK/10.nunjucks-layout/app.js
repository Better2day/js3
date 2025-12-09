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
  res.render('main', { title: 'Express app', content: 'NJK를 사용해서 SSR 하는 중' });
});

app.get('/user', (req, res) => {
  res.render('user', { title: 'User page', content: '각종 사용자 정보를 출력' });
});

app.get('/product', (req, res) => {
  res.render('product', { title: 'Product page', content: '각종 상품 정보를 출력' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
