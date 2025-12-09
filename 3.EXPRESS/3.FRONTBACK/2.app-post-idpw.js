const express = require('express');
const app = express();
const PORT = 3000;

// static folder를 설정해서 html 파일을 서빙하시오

app.use(express.static('public'));

app.post('/login', (req, res) => {
  console.log(req.body); // POST 방식일 때는 body에 데이터를 넣어서 전송
  let data = '';

  // HTTP Body가 한 덩어리로 올지 두 덩어리로 올지 알 수 없다. 그래서 올 때마다 콜백 함수 호출
  req.on('data', chunk => {
    data += chunk.toString();
  });

  req.on('end', () => {
    console.log(`전체 데이터 모음: ${data}`);
    const params = new URLSearchParams(data);
    console.log(params);
    console.log(params.entries());
    const obj = Object.fromEntries(params.entries());
    console.log(obj);
    res.send(`<h1>당신의 ID는 ${obj.id}, PW는 ${obj.pw}입니다.</h1>`);
  })

  // console.log(`ID = ${id}, 비밀번호 = ${pw}`);
  // console.log('사용자가 보내온 결과를 출력할 예정');
  // res.send(`<h1>${id}님이 로그인되었습니다.</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
