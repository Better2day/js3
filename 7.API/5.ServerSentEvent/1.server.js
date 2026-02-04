const path = require('path');
const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '1.index.html'));
});

app.get('/events', (req, res) => {
  // SSE Header 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendTime = () => {
    res.write(`data: 서버로부터 온 시간: ${new Date().toISOString()}\n\n`);
  }

  const interval = setInterval(sendTime, 1000); // 매초 시간 정보 보내기

  // 여기에 온 요청은 종료하지 않고 계속 대기

  // 연결이 종료되면? (클라이언트가 브라우저 창이나 탭을 닫으면) (∵ 그대로 놔두면 계속 setInterval이 돌아가서 메모리 누수)
  req.on('close', () => {
    console.log('클라이언트가 떠나서 타이머 종료:', interval);
    clearInterval(interval); // 기존 주기적 전송 타이머 제거
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
