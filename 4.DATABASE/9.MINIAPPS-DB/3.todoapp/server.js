const express = require('express');
const db = require('better-sqlite3')('my-todo.db');
const morgan = require('morgan');


const PORT = 3000;
const app = express();


function initDb(db) {
  try {
    db.exec(`
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY,
  todo TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0
)`);
  } catch (err) {
    console.log('테이블 생성 오류 발생: ', err)
  }
};

initDb(db);

// Mideelware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json()); // FE에서 json 형식의 데이터를 보내면, 그걸 파싱해서 req.body에 담아줌
// app.use(express.urlencoded({ extended: false })); // FE에서 urlencoded 형식의 데이터를 보내면, "

// Route start -->
app.get('/api/todos', (req, res) => {
  console.log('To do 달라는 요청 받음');

  // To do: DB에 SELECT * FROM todos 를 질의해서 목록을 받아온다.
  try {
    const query = db.prepare('SELECT * FROM todos');
    const todos = query.all();
    console.log(todos);
    res.send(todos);
  } catch (err) {
    console.log('오류 발생: ', err);
  }
});

app.post('/api/todos', (req, res) => {
  console.log('To do 생성해달라는 요청 받음');
  console.log(req.body);
  console.log('Request body: ' + JSON.stringify(req.body));
  const newTodo = [req.body.todo, 0];
  // 여기서 Todo를 객체가 아니라 배열로 만든 것은 아래 INSERT 문에서 편하게 REST 문법을 이용하기 위함

  // To do: INSERT INTO todoes VALUES (newTodo.todo) 등으로 데이터 삽입
  try {
    const query = db.prepare('INSERT INTO todos(todo, completed) VALUES(?, ?)');
    const todo = query.run(...newTodo);
    console.log(todo);
    res.send(newTodo);
  } catch (err) {
    console.log('오류 발생: ', err);
  }

  // res.json(({ "status": "ok" }));
});

app.delete('/api/todos/:id', (req, res) => { // 입력 인자를 Query Parameter, URL Parameter 중 어느 것으로 받을지 결정
  // id를 받아서, 그 id를 가진 todo를 삭제한다.
  const id = req.params.id;
  console.log(`${id}번 To do를 삭제해달라고 요청`);

  // To do: DELETE FROM todos WHERE id = ? 형태로 질의해서 데이터 삭제
  try {
    const query = db.prepare('DELETE FROM todos WHERE id=?');
    const todo = query.run(id);
    console.log(todo);
    res.json({ success: true });
  } catch (err) {
    console.log('오류 발생: ', err);
  }

  // todos = todos.filter(todo => todo.id != id);
  // res.json(({ success: true })); // 다양한 양식으로 작성해봤지만, 한 유형으로 통일하는 게 좋다.
});

app.put('/api/todos/:id/completed', (req, res) => { // 입력 인자. 위철
  const id = req.params.id;
  console.log(`${id} 완료 여부 확인`);

  // To do: 일단 해당 todo 데이터가 있는지 확인 후
  // UPDATE todos SET column=변경하고싶은값 WHERE id = ? 형태로 질의해서 데이터 변경
  try {
    const query = db.prepare('SELECT * FROM todos WHERE id=?');
    const todo = query.get(id);
    console.log(todo);
    // if (typeof todo == 'undefined') {
    //   res.json({ success: false });
    //   return false;
    // }

    try {
      const query = db.prepare('UPDATE todos SET completed=? WHERE id=?');
      const result = query.run(todo.completed ? 0 : 1, id);
      console.log(result);
      res.json({ success: true });
    } catch (err) {
      console.log('오류 발생: ', err);
    }
  } catch (err) {
    console.log('오류 발생: ', err);
  }


  // const todo = todos.find(todo => todo.id == id);
  // console.log('검색한 내용: ', todo);
  // console.log('To do 수정해달라는 요청 받음');
  // id를 찾아서, completed를 토글 (true/false 변경)
  // res.send(todos);
});
// Route end -->


app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
