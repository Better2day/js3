const express = require('express');
const morgan = require('morgan');

const PORT = 3000;
const app = express();

let todos = []; // 여기에 사용자가 입력한 todo가 담길 곳...
let idCounter = 1;

// Mideelware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json()); // FE에서 json 형식의 데이터를 보내면, 그걸 파싱해서 req.body에 담아줌
// app.use(express.urlencoded({ extended: false })); // FE에서 urlencoded 형식의 데이터를 보내면, "

// Route start -->
app.get('/api/todo', (req, res) => {
  console.log('To do 달라는 요청 받음');
  res.send(todos);
});

app.post('/api/todo', (req, res) => {
  console.log('To do 생성해달라는 요청 받음');
  console.log(req.body);
  console.log('Request body: ' + JSON.stringify(req.body));
  const newTodo = { id: idCounter++, todo: req.body.todo, completed: false };

  console.log(newTodo);
  todos.push(newTodo);

  // res.json(newTodo);
  // res.json({ id: newTodo.id });
  res.json(({ "status": "ok" }));
});

app.delete('/api/todo', (req, res) => { // 입력 인자를 Query Parameter, URL Parameter 중 어느 것으로 받을지 결정
  console.log('To do 삭제해달라는 요청 받음');
  // id를 받아서, 그 id를 가진 todo를 삭제한다.
  // todos.filter를 통해서 비교
  res.json(({ success: true })); // 다양한 양식으로 작성해봤지만, 한 유형으로 통일하는 게 좋다.
});

app.put('/api/todo', (req, res) => { // 입력 인자. 위철
  console.log('To do 수정해달라는 요청 받음');
  // id를 찾아서, completed를 토글
  res.send(todos);
});
// Route end -->


app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
