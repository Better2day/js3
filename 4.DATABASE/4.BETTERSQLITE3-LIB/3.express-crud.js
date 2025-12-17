const fs = require('fs');
const express = require('express');
const Database = require('better-sqlite3');

const PORT = 3000;
const db_file = 'my-express-db.db';

const app = express();
const db = new Database(db_file);

// 입력 요청을 JSON으로 받아서 req.body에 받아주기 위한 미들웨어
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


function init_database() {
  // readFileSync 동기 모드로 파일을 읽어온다 (blocking 함수)
  const sql = fs.readFileSync('init-database.sql', 'utf8');
  // 각 행을 ;로 잘라서, 빈 행(undefiled/null 등)으로 나오는 것을 제외 
  // const statements = sql.split(';').filter(Boolean);
  const statements = sql.split(';');
  // console.log(statements);

  try {
    // db.transaction은 성공하면 commit, 실패하면 rollback;
    db.transaction(() => {
      for (const statement of statements) {
        db.exec(statement);
      }
    })();
    console.log('try 블록 실행');
  } catch (error) {
    console.log('이미 초기화되었습니다.');
  }

  // for (const statement of statements) {
  //   // console.log(statement);
  //   db.exec(statement);
  // }
  // db.run();
}

init_database();

app.get('/api/table/:table', (req, res) => {
  const dbTable = req.params.table;

  const query = db.prepare(`SELECT * FROM ${dbTable}`);
  const queryResult = query.all();
  res.json(queryResult);
});

app.get('/api/users', (req, res) => {
  // try - catch 해줘야 함
  const { username } = req.query;

  if (username) {
    const query = db.prepare('SELECT * FROM users WHERE username LIKE ?');
    const users = query.all(`%${username}%`);
    res.json(users);

  } else {
    const users = db.prepare('SELECT * FROM users').all();
    res.send(users);
  }
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  const user = db.prepare('SELECT * FROM users WHERE id=?').get(userId);
  if (user) {
    res.json(user);
  } else {
    // return res.send('사용자가 없습니다'); // 이렇게 하면 200 이 전달됨
    return res.status(404).send('사용자가 없습니다.');
  }
});

app.post('/api/users', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const insert = db.prepare('INSERT INTO users(username, password) VALUES(?, ?)');
  const result = insert.run(username, password);
  res.send(`사용자가 추가되었습니다. 신규 ID: , ${result.lastInsertRowid}`);
});

// 숙제
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const { username, password } = req.body;
  const update = db.prepare('UPDATE users SET username=?, password=? WHERE id=?');
  update.run(username, password, userId);
  res.send('사용자 정보가 업데이트되었습니다');
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  const deleteQuery = db.prepare('DELETE FROM users WHERE id=?').run(userId);
  console.log(deleteQuery);
  if (deleteQuery.changes == 1) {
    res.status(200).send({ success: true });
  } else {
    res.status(404).send({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
