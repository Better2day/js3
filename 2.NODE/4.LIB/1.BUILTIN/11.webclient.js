const http = require('http');

// const url = 'http://www.example.com/path/test.html';
const url = 'http://www.example.com/';

const req = http.request(url, res => {
  console.log('요청 끝. 상태 코드: ', res.statusCode);

  res.on('data', chunk => {
    console.log('데이터 수신: ', chunk);
  })
});

req.on('error', error => {
  console.log('오류 발생');
});

req.end(); // 메서드 명은 end이지만, 이게 시작을 해준다.
