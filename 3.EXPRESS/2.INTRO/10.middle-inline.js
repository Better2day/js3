const express = require('express');
const app = express();
const PORT = 3000;

function middleware1(req, res, next) {
  console.log('1st Middleware');
  next();
}
function middleware2(req, res, next) {
  console.log('2nd Middleware');
  next();
}
function middleware3(req, res, next) {
  console.log('3rd Middleware');
  next();
}
function middleware4(req, res, next) {
  console.log('4th Middleware');
  next();
}

app.use(middleware1);

app.get('/', (req, res) => {
  console.log(`사용자가 왔음. 누가?, ${req.socket.remoteAddress}`);
  res.send('<h1>안녕</h1>');
});

app.get('/middle', middleware2, middleware3, (req, res) => {
  console.log('최종 미들 라우트 위치 도착');
  res.send('<h1>Middleware Route</h1>');
});

app.get('/last', middleware4, (req, res) => {
  console.log('최종 라스트 라우트 위치 도착');
  res.send('<h1>Middleware Route</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
