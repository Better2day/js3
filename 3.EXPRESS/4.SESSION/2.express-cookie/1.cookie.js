const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
  res.cookie('mycookie', 'test');
  res.cookie('username', 'user1');
  res.send('hello');
});

app.get('/dashboard', (req, res) => {
  // const userCookie = req.cookies.mycookie;
  // const userName = req.cookies.username;
  const { mycookie, username } = req.cookies;
  console.log(mycookie);
  console.log(username);
  res.send(`당신은 ${username}입니다. 그리고 ${mycookie}`);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
