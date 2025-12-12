const express = require('express');
const figlet = require('figlet');
const app = express();
const PORT = 3000;

// 무한 스크롤 기능 구현을 위해서 필요한 가상 데이터 생성
const data = Array.from({ length: 120 }, (_, i) => `Item ${(i + 1).toString().padStart(2, '0')}`);
console.log(data);

// Middleware
app.use(express.static('public'));

// 0. 미들웨어로 [시간] [METHOD] [URL-Path]를 찍어보기
function myLogger(req, _, next) { // 입력 인자를 채워넣고
  // 나중에 morgan이라는 로그 라이브러리를 사용할거고, 지금은 경험을 위해 만들어봤음
  const now = new Date().toLocaleString();
  // const formattedTime = currentTime.toLocaleTimeString('ko-KR', { hour12: true });
  // console.log(now);

  // console.log(`[${now}] [${req.method}] [${req.path}]`);
  console.log(`[${now}] [${req.method}] [${req.originalUrl}]`); // originalUrl이 Path?Query Parameter 형식 결과를 출력

  next();
}

app.use(myLogger);

// /api/items?start=5&end=10
app.get('/api/items', (req, res) => {
  // 1. 변수 선언. 사용자의 입력을 받아온다.
  // 모든 입력은 다 문자열이므로, 내부 연산을 위해서 필요한 타입으로 변환해주는 것이 좋다.
  // const start = Number(req.query.start);
  // const end = Number(req.query.end);
  const { start, end } = req.query;
  console.log(`start = ${start}, end = ${end}`);

  // 2. 이 번호에 해당하는 것을 우리 배열에서 골라낸다.
  const slicedArray = data.slice(Number(start), Number(end));
  console.log(slicedArray);

  // 3. 그 내용을 전달한다.
  res.json(slicedArray);
});

app.listen(PORT, () => {
  figlet('JS Arena', (err, data) => { if (!err) console.log(data); })
  console.log(`Server is running on http://localhost:${PORT}`);
});
