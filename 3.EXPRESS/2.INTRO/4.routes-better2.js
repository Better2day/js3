const express = require('express');
const app = express();
const PORT = 3000; // 보통 상수는 대문자

app.get('/', (req, res) => {
  res.send('<h1>나의 루트</h1>');
});

// 상품 조회는 일반적으로 GET 파라미터 (쿼리 파라미터)를 통해서 요청이 들어옴
// 예시. 127.0.0.1:3000/search?keyword=apple
// 우리 실습. 127.0.0.1:3000/products?keyword=apple
app.get('/products', (req, res) => {
  // GET 파라미터는 쿼리 파라미터라고 부르고, req.query에 담겨서 온다.
  console.log(`상품 분류: ${req.query.category}, 상품 이름: ${req.query.name}`);
  res.send('나의 상품');
});

// 고객의 ID를 어떻게 보내올까?
app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`나의 사용자 ID는 ${req.params.id} 입니다`);
});

app.post('/users', (req, res) => {
  let newId = 12345;
  // console.log(req.params.id);
  res.send(`나의 신규 사용자 생성: 신규 ID는 ${newId}입니다.`);
});

app.put('/users/:id', (req, res) => {
  res.send('나의 사용자 정보 수정 ');
});

app.delete('/users', (req, res) => {
  res.send('나의 신규 사용자 삭제');
});

// 아래처럼 모든 것을 GET METHOD를 이용하면서
// URL에 CREATE, MODIFY, DELETE 등의 경로(?)를 넣어서 처리하는 것은 가장 나쁜 원칙
app.get('/user/create', (req, res) => {
  res.send('나의 신규 사용자 생성');
});

app.get('/user/modify', (req, res) => {
  res.send('나의 사용자');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
