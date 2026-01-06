const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
const users = [
  { id: 1, username: 'u1', password: 'pw1' },
  { id: 1, username: 'u2', password: 'pw2' }
];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hw-login1.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username == username && u.password == password);

  if (user) {
    res.json({ username: user.username, password: user.password });
  } else {
    res.status(401).json({ message: 'login 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
