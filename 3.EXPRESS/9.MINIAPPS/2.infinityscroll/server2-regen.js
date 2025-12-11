const express = require('express');
const figlet = require('figlet');
const app = express();
const PORT = 3000;

// 무한 스크롤 기능 구현을 위해서 필요한 가상 데이터 생성
const data = Array.from({ length: 100 }, (_, i) => `Item ${(i + 1).toString().padStart(2, '0')}`);
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

// 0부터 20 사이의 랜덤 숫자 생성
function getRandomIncrease() {
  return Math.floor(Math.random() * 21); // 0~20

}
// 매 10초마다 위에서 얻은 무작위 개수만큼 증가
setInterval(() => {
  const randNum = getRandomIncrease();
  const currentLength = data.length;
  for (let i = 0; i < randNum; i++) {
    data.push(`Item ${currentLength + i + 1}`);
  }
  console.log(`${randNum} Added`);
}, 5_000); // 10,000ms = 10s

// /api/items?start=5&end=10
app.get('/api/items', (req, res) => {
  // 1. 변수 선언. 사용자의 입력을 받아온다.
  // 모든 입력은 다 문자열이므로, 내부 연산을 위해서 필요한 타입으로 변환해주는 것이 좋다.
  // const start = Number(req.query.start);
  // const end = Number(req.query.end);
  const { start, end } = req.query;
  console.log(`start = ${start}, end = ${end}`);

  // 2. 이 번호에 해당하는 것을 우리 배열에서 골라낸다.
  // const startTime = Date.now();
  // const filteredArray = data.filter((_, idx) => idx >= start && idx < end);
  const slicedArray = data.slice(Number(start), Number(end));
  // const endTime = Date.now();
  // console.log((endTime - startTime) + 'ms');
  // 요소 100개 다 순회할테니, 시작과 끝 요소가 정해져 있는 상황에서는 강사님 방식처럼 slice가 성능이 미세하게라도 더 나을 듯 (요소 개수가 많아질수록)
  // 단순 배열 100만 개로 해보니 filter 방식은 86ms, slice 방식은 0ms)

  // 3. 그 내용을 전달한다.
  res.json(slicedArray);
});

app.listen(PORT, () => {
  figlet('JS Arena', (err, data) => { if (!err) console.log(data); })
  console.log(`Server is running on http://localhost:${PORT}`);
});
