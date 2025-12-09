const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Form data로 온 것을 x-www-form-urlencoded라고 부른다.
// 이 미들웨어는? 사용자로부터 전달받은 위 MIME 타입을 찾아서 req.body에 담아준다.
app.use(express.urlencoded({ extended: false })); // 확장 문법 사용하지 않음. 기본만 사용

app.post('/login', (req, res) => {
  console.log(req.body); // 원래는 req에 body라는 속성은 없는데 middleware를 거치면서 생성된 것
  const id = req.body.id;
  const pw = req.body.pw;

  res.send(`당신의 ID는 ${id}, 비밀번호는 ${pw}입니다`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
