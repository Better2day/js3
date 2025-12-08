const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use((req, res, next) => {
  console.log('내가 중간에 요청을 가로챘다. 로그인했는지 확인했는데 안 했네?');
  // res.send('로그인부터 하고 오세요!');

  next(); // 다음 것 호출
});

app.use((req, _, next) => { // logger라서 client 측에 res를 보내지 않을 것이라서 인자를 밑줄로 설정 (관행. 화살표 함수 안에서 _을 사용할 수도 있다.)
  console.log('2번째 미들웨어');
  console.log('사용자 왔다 감: ', req.socket.remoteAddress);

  next(); // 다음 것 호출
});

app.use((_req, _res, next) => {
  console.log('3번째 미들웨어');

  next(); // 다음 것 호출
});

// router
app.get('/', (req, res) => {
  console.log('4. Root(Home) route 접속');
  res.send('Welcome to my home !');
});

app.get('/users', (req, res) => {
  console.log('User route 접속');
  res.send('Welcome to users\' home !');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
