const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

// 세션 연동. 세션은 서버에 저장 (어디에? disk/DB/memory(기본값))
app.use(session({
  secret: 'my-secret-key', // 서버만 알고 있는 비밀키
  resave: false, // 세션 데이터에 변경이 없어도 저장하는 옵션
  saveUninitialized: true // 내용이 없는 (초기화가 안 된) 빈 세션도 저장
}));

function visitCounter(req, res, next) {
  req.session.visitCount = req.session.visitCount || 0;
  // 사용자 방문 횟수 증가
  req.session.visitCount++;
  console.log('이 사용자의 방문 횟수는: ', req.session);
  next();
}

app.use(visitCounter);


app.get('/', (req, res) => {
  req.session.username = 'user1';
  req.session.cart = ['사과우유', '딸기우유', '바나나우유'];

  res.send(`당신의 방문 횟수는 ${req.session.visitCount} 입니다.`);

  // res.send('hello');
});

app.get('/user', (req, res) => {
  const { username } = req.session;
  console.log(username);
  res.send(`당신은 ${username}이군요. 반갑습니다.`)
});

app.get('/shop', (req, res) => {
  const { username, cart } = req.session;
  console.log(username, cart);
  res.send(`당신은 ${username}이고, 여기는 OOO 쇼핑몰입니다. 장바구니에 ${cart}를 담았습니다.`)
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
