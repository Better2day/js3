const http = require('http');

// const url = 'http://www.example.com/path/test.html';
const url = 'http://www.example.com/';

const req = http.request(url, res => {
  console.log('Status: ', res.statusCode);
  // console.log(`Headers: ${JSON.stringify(res.headers)}`);
  console.log('Headers: ', res.headers);
  console.log(`Headers: ${res.headers}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);

  res.setEncoding('utf8');

  res.on('data', chunk => {
    console.log('Body:', chunk);
  })
});

req.on('error', error => {
  console.log('오류 발생');
});

req.end(); // 메서드 명은 end이지만, 이게 시작을 해준다.
