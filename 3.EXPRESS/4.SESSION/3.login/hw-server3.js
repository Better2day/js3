const path = require('path');
const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

const users = [
  { id: 1, username: 'u1', password: 'pw1' },
  { id: 1, username: 'u2', password: 'pw2' }
];

app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30000,
    httpOnly: true, // Javascript에서 쿠키에 접근 불가
    // secure: false, // Ensures the browser only sends the cookie over HTTPS.
  }
}));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hw-login3.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username == username && u.password == password);

  if (user) {
    req.session.user = user;
    res.json({ id: user.id, username: user.username, isLoggedIn: true });
  } else {
    res.status(401).json({ message: 'login 실패', isLoggedIn: false });
  }
});

app.get('/check-login', (req, res) => {
  const { user } = req.session;

  if (user) {
    res.json({ id: user.id, username: user.username, isLoggedIn: true });
  } else {
    res.status(401).json({ message: 'login 실패', isLoggedIn: false });
  }
});

app.get('/profile', (req, res) => {
  // if (req.session.) {}
  const { user } = req.session;
  console.log(user);
  if (user) {
    return res.json({ id: user.id, username: user.username });
  }
  res.status(401).json({ error: '회원이 아닙니다.' });
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    return res.json({ message: 'logout 성공', isLoggedIn: false })
  }
  res.json({ message: 'logout 실패', isLoggedIn: true })
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
