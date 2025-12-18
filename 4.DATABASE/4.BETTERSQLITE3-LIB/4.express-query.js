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
  // 위 filter 고차 배열 함수는 filter(x => Boolean(x)); 축약 형태
  // 현재 결과가 다르지 않은 것은, sql 파일 안에 오타 등 별 오류가 없기 때문
  const statements = sql.split(';');
  // 지금 상황에서 조금 더 의미 있는 것은
  // const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
  // console.log(statements);

  try {
    // db.transaction은 성공하면 commit, 실패하면 rollback;
    db.transaction(() => {
      for (const statement of statements) {
        console.log(statement);

        try {
          db.exec(statement);
        } catch (error) {
          console.log('오류 발생:', error.message);
        }
      }
      console.log('try 블록 실행');
    })();
  } catch (error) {
    console.log('이미 초기화되었습니다.'); // 여기서만 오류를 잡으면 좋은 코드는 아님
  }
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
  const users = db.prepare('SELECT * FROM users').all();
  res.send(users);
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

app.get('/api/products', (req, res) => {
  const { name } = req.query;

  if (name) {
    const query = db.prepare('SELECT * FROM products WHERE name like ?');
    const rows = query.all(`%${name}%`);
    res.json(rows);
  } else {
    const query = db.prepare('SELECT * FROM products');
    const rows = query.all();
    res.json(rows);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
