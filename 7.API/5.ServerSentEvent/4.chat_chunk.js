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
  res.sendFile(path.join(__dirname, 'public', '4.chat_chunk.html'));
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
  const timestamp = new Date().toLocaleTimeString();
  const newMessage = { username, message, timestamp };
  console.log(newMessage);

  messages.push(newMessage);

  // const id = Date.now().toString() + '-' + Math.floor(Math.random() * 10000);
  const id = timestamp + '-' + Math.floor(Math.random() * 10000);

  // 한 번에 보내지 않고, 글자 단위로 보내기 (ChatGPT 처럼)
  let index = 0;
  const interval = setInterval(() => {
    if (index < message.length) {
      const char = message[index]; // 이번에 보낼 한 글자

      const payload = {
        id,
        username,
        chunk: char,
        timestamp: newMessage.timestamp,
        isStreaming: index < message.length - 1 // 마지막 글자인지 여부
      }
      console.log(payload);

      clients.forEach(client => {
        client.write(`data: ${JSON.stringify(payload)}\n\n`);
      });

      index++;
    } else {
      clearInterval(interval);
    }
  }, 100); // 100ms 단위로 한 글자씩

  res.status(200).send({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
