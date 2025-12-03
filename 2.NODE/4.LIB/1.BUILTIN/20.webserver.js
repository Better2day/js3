const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  const ip = req.socket.remoteAddress;
  console.log('접속자를 추적했음: ', ip);

  // 사용자에게 보낼 파일을 읽어서 준비
  fs.readFile('index.html', 'utf-8', (err, data) => {
    if (err) {
      console.log('Error');
      res.writeHead(500, { 'Content-Type': 'text/html' });
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  })
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.end('<meta charset="UTF-8"><h1>안녕하세요, 내 서버입니다.</h1>');
});

server.listen(3000);
