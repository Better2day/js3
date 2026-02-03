const path = require('path');
const express = require('express');
const expressWs = require('express-ws');

const PORT = 3000;
const app = express();
expressWs(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

// 웹소켓의 다양한 사용자를 관리하기 위해서 Map 자료구조 사용. Map(username, ws) 키-값으로 저장
const wsClients = new Map();

app.ws('/chat', (ws, req) => { // 콜백 함수의 인수가 req, res가 아니다. ※ 인수 순서 주의 !
  const clientIp = req.socket.remoteAddress; // 접속자의 IP 주소 가져오기
  console.log('클라이언트 접속 IP:', clientIp);

  ws.on('message', message => { // 클라이언트로부터 받아온 메시지 처리
    console.log('메시지:', message);

    // ws.send(message);
    const parsedMessage = JSON.parse(message);
    const username = parsedMessage.username;
    const content = parsedMessage.content;
    const type = parsedMessage.type;

    // 기존에 이 사용자가 준 메시지가 있나?
    if (username && !wsClients.has(username)) {
      // 새로운 사용자
      console.log('새로운 사용자 등장:', username);
      wsClients.set(username, ws);
      broadcastMessage(`[${username}] 님이 채팅방에 들어오셨습니다.`)
    }

    if (type === 'session') {
      // 신규 사용자 등장
    } else {
      // 일반 메시지
      const messageObj = {
        type: 'received',
        content: content,
        sender: username
      };

      wsClients.forEach((client, u) => { // Map (key-value 저장)에서 forEach를 쓸 때 첫 번째 인수가 value, 두 번째가 우리가 원하는 key
        messageObj.type = client === ws ? 'sent' : 'received';
        messageObj.sender = client === ws ? 'me' : username;
        console.log(`보내는 중: ${u}: ${JSON.stringify(messageObj)}`);
        client.send(JSON.stringify(messageObj));
      });
    }
  });

  function broadcastMessage(message) {
    wsClients.forEach(client => {
      const broadcastObj = {
        type: 'broadcast',
        content: message
      }
      client.send(JSON.stringify(broadcastObj));
    })
  }

  ws.on('close', () => {
    let leftUser;

    // 떠난 사람 찾기
    wsClients.forEach((client, clientId) => {
      if (client === ws) {
        leftUser = clientId;
        console.log('사용자 한 명 떠남:', leftUser);
        wsClients.delete(leftUser);
      }
    })

    // 모두에게 알려주기
    broadcastMessage(`[${leftUser}] 님이 채팅방을 떠났습니다.`)
  })
});

app.listen(PORT, () => {
  console.log('웹서버 + 웹소켓 서버 대기중');
});
