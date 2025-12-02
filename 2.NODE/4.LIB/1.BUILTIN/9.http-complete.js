const http = require('http');

const server = http.createServer();
server.on('connection', () => {
  console.log('TCP 연결이 시작되었습니다');
})

server.on('request', (req, res) => {
  console.log('HTTP 요청이 시작되었습니다');
  res.writeHead(200, { 'Content-Type': 'text/html' }); // 내 응답 (HTTP Response)
  // res.end('Hello, HTTP Server!');
  res.end('<meta charset="utf-8"><H1>안녕</H1><H2>Heading</H2>');
});

console.log('서버는 사실 여기에서 시작됩니다');
server.listen(3000); // 서버가 대기 상태에 들어간다.
console.log('나는 언제 찍힐까?');
