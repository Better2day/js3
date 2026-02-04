const path = require('path');
const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.static('public'));
app.use(express.json());

const clients = []; // 연결된 사용자 관리
const messages = [];
messages.push({ username: 'Server', message: '채팅을 시작합니다.' }); // sample message

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '3.chat.html'));
});

app.get('/chat', (req, res) => {
  // SSE Header 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);
  console.log('새로운 사용자에게 응답을 보낼 준비 완료');

  messages.forEach(msg => {
    res.write(`data: ${JSON.stringify(msg)}\n\n`);
    // messages.pop(); // 흘러간 메시지 삭제. 이 부분을 주석 처리하면 이 채팅방의 모든 대화가 저장되서, 새로운 사용자가 들어왔을 때 기존 대화를 다 보내준다.
  });

  // 연결이 종료되면? (클라이언트가 브라우저 창이나 탭을 닫으면) (∵ 그대로 놔두면 계속 setInterval이 돌아가서 메모리 누수)
  req.on('close', () => {
    // 
  });
});

app.post('/send-message', (req, res) => {
  const { username, message } = req.body;
  const newMessage = { username, message, timestamp: new Date().toLocaleTimeString() };
  console.log(newMessage);

  messages.push(newMessage);

  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(newMessage)}\n\n`);
  });

  res.status(200).send({ success: true });
  // res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
