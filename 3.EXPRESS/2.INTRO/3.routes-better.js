const express = require('express');
const app = express();
const PORT = 3000; // 보통 상수는 대문자

app.get('/', (req, res) => {
  res.send('<h1>나의 루트</h1>');
});

app.get('/product', (req, res) => {
  res.send('나의 상품');
});

app.get('/user', (req, res) => {
  res.send('나의 사용자');
});

app.post('/user', (req, res) => {
  res.send('나의 신규 사용자 생성');
});

app.put('/user', (req, res) => {
  res.send('나의 사용자 정보 수정 ');
});

app.delete('/user', (req, res) => {
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
