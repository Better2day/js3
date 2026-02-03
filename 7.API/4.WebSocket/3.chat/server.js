// npm install ws
const path = require('path');
const WebSocket = require('ws');
const express = require('express');

const app = express();

const EXPRESS_PORT = 3000;
const WEBSOCKET_PORT = 3333;

const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client.html'));
})

// 웹소켓으로 받은 메시지를 다 전달 (broadcast)
wss.on('connection', ws => {
  ws.on('message', msg => {
    let content = '';

    try {
      const parsedMsg = JSON.parse(msg);
      content = parsedMsg.content;
    } catch {
      console.error('Invalid JSON format: ', error);
      return;
    }

    wss.clients.forEach(client => {
      const messageType = client === ws ? 'sent' : 'received';
      const messageObj = { type: messageType, content: content };
      client.send(JSON.stringify(messageObj));

      // if (client === ws) {
      //   const messageObj = {
      //     type: 'sent',
      //     content: content
      //   };
      //   client.send(JSON.stringify(messageObj));
      // } else {
      //   const messageObj = {
      //     type: 'received',
      //     content: content
      //   };
      //   client.send(JSON.stringify(messageObj));
      // }
    })
  })
});

console.log(`웹소켓 서버 실행중. ws://localhost:${WEBSOCKET_PORT}`);

app.listen(EXPRESS_PORT, () => {
  console.log(`익스프레스 서버 실행중. http://localhost:${EXPRESS_PORT}`);
});
