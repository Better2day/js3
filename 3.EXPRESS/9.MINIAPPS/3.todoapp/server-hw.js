const express = require('express');
const morgan = require('morgan');

const PORT = 3000;
const app = express();

const toDoList = [];
let todoId = 1;

// Middleware
app.use(express.static('public', { index: 'index-hw.html' })); // 기본 route (/) 요청을 연결할 기본 HTML file 설정
app.use(express.json());
app.use(morgan('dev'));

app.post('/api/todo', (req, res) => {
  const todo = req.body.todo;
  toDoList.push({ id: todoId, todo })
  res.json({ id: todoId++, todo });

  console.log('To do 항목이 생성되었습니다.');
  console.log(toDoList);
});

app.get('/api/todo', (req, res) => {
  res.json(toDoList);
  console.log('To do 목록을 조회했습니다.');
  console.log(toDoList);
});

// PUT /api/todo/:id    <-- todo를 해당 아디지만 수정해주시오
// PUT /api/todo/:id/completed     <-- 이게 더 낫다...
app.put('/api/todo/:id/todo', (req, res) => {
  const indexToPut = toDoList.findIndex(todo => todo.id == req.params.id);
  toDoList[indexToPut].todo = req.body.todo;
  res.json({ id: toDoList[indexToPut].id, todo: toDoList[indexToPut].todo });

  console.log('To do 항목이 수정되었습니다.');
  console.log(toDoList);
});

app.delete('/api/todo/:id', (req, res) => {
  const todoId = req.params.id;
  toDoList.splice(toDoList.findIndex(todo => todo.id == todoId), 1);
  res.json({ 'success': 'true' });

  console.log('To do 항목이 삭제되었습니다.');
  console.log(toDoList);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
