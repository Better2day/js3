const fs = require('fs');
const http = require('http');
const URL = require('url');

const server = http.createServer();

// 서버가 8000번 포트를 열고 기다린다.
// 사용자의 요청이 오면, 파일을 열어서 그 내용을 전달한다.

server.on('connection', () => {
  console.log('사용자의 요청이 왔습니다');
});

// const myURL = 'https://www.example.com/api/path?query=value';
// const urlObj = new URL(myURL);

// console.log('Host: ', urlObj.host);
// console.log('Path: ', urlObj.pathname);
// console.log('Query: ', urlObj.search);
// console.log('Hash: ', urlObj.hash);
// console.log('Origin: ', urlObj.origin);
// console.log('Port: ', urlObj.port);
// console.log('Protocol: ', urlObj.protocol);
// console.log('searchParams: ', urlObj.searchParams);

server.on('request', (req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html' })

  console.log(req.url);

  // fs.readFile('./10.hello.html', (err, data) => {
  fs.readFile(req.url.slice(1), 'utf-8', (err, data) => {
    if (err) {
      console.log('파일 읽기 실패');
      res.writeHead(500);
      res.end();
    }
    res.end(data);
  });
  // res.end('<meta charset="utf-8"><h1>안녕</h1>');
});

server.listen(8080);