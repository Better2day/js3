const express = require('express');
const app = express();
const PORT = 3000;

/******************************/
/*  Middleware                */
/**************************** */
// 등록 순서가 중요하다. (※ 만약 특정 route가 middleware 위에 있으면, 그 라우트는 미들웨어를 거치지 않는다.)
app.use((req, res, next) => {
  let requestTime = Date.now();
  console.log(`[LOGGING] ${Date(requestTime).toString()}`);
  // res.send('로그인부터 하고 오세요!');
  req.thisIsMyTime = Date(requestTime).toString();
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
  console.log(`여기까지도 시간이 전달되었나? ${req.thisIsMyTime}`);
  res.send('Welcome to my home !');
});

app.get('/users', (req, res) => {
  console.log('User route 접속');
  res.send('Welcome to users\' home !');
});

/********************************/
/*  아무 것도 매칭되지 못한 경우  */
/********************************/
// 1) 404 Handler (Error가 아니라서 아래 미들웨어를 거치지 않는다.)
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// 2) 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.log('5. 최종 오류 처리 미들웨어: ', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
