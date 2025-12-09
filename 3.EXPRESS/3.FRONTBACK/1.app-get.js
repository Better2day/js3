const express = require('express');
const app = express();
const PORT = 3000;

// static folder를 설정해서 html 파일을 서빙하시오

app.use(express.static('public'));

app.get('/submit', (req, res) => {
  // 우리가 배운 것을 활용해서, 사용자가 보낸 값을 콘솔 로그로 출력하기
  const { name, age } = req.query;
  console.log('req.params: ');
  console.log(req.params);
  console.log('req.query: ');
  console.log(req.query);
  // console.log(`name = ${name}, age = ${age}`);
  console.log(`name = ${req.query.name}, age = ${req.query.age}, etc = ${req.params.id}`);
  // console.log('사용자가 보내온 결과를 출력할 예정');
  res.send(`<h1>${name}님이 로그인되었습니다.</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
