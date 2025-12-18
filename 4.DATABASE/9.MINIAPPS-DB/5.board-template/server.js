const express = require('express');
// DB 파일 분리. 비즈니스 로직은 그대로 둔채로, DB만 바꿔가면서 연결한다든지 확장성↑
const Database = require('./database');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const db = new Database();

app.get('/api/list', (req, res) => {
  console.log('목록 조회');
  // Business Logic
  const sql = 'SELECT * FROM board';
  const result = db.executeQuery(sql);
  console.log(result);
  res.json(result);
});

app.post('/api/create', (req, res) => {
  const { title, message } = req.body;
  console.log('글 작성');
  console.log(`${title} ${message}`);
  // Business Logic
  const sql = 'INSERT INTO board(title, message) VALUES(?, ?)';
  db.execute(sql, [title, message]);

  res.json({ 'result': 'success' });
  // res.send('글 작성');
});

app.delete('/api/delete', (req, res) => {
  console.log('글 삭제');
  // Business Logic
  res.send('글 삭제');
});

app.put('/api/modify', (req, res) => {
  console.log('글 수정');
  // Business Logic
  res.send('글 수정');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
