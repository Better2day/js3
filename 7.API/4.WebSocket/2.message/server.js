// npm install ws
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

// 암기해야 하는 문법
wss.on('connection', ws => {
  console.log('클라이언트 연결됨');
  const myMsg = {
    type: 'chat',
    content: '서버와 잘 연결되었습니다.'
  };

  ws.send(JSON.stringify(myMsg));

  const intervalId = setInterval(() => {
    const myMsg = {
      type: 'system',
      content: '주기적인 메시지. 잘 계십니까?'
    }
    ws.send(JSON.stringify(myMsg));
  }, 5000);

  ws.on('message', msg => {
    console.log('클라이언트 메시지: ', msg.toString());

    const cliMsg = JSON.parse(msg);

    const myMsg = {
      type: 'chat',
      content: cliMsg.content
    }

    // ws.send(JSON.stringify(myMsg)); // 지금은 메시지를 보낸 당사자 (즉, we) 에게만 반송한다.
    // 앞으로 하고 싶은 건(클라이언트끼리 채팅할 수 있도록 하는 것), 모든 ws 들에게 메시지를 전달한다.

    wss.clients.forEach(client => { // client == 개별 ws
      client.send(JSON.stringify(myMsg));
    });
  })
});

console.log('웹소켓 서버 실행중. ws://localhost:8000');
