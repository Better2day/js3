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
  console.log('Post route');
  console.log('데이터가 생성되었습니다.');
  const todo = req.body.todo;
  toDoList.push({ id: todoId, todo })

  res.json({ id: todoId++, todo });
  console.log(toDoList);
});

app.get('/api/todo', (req, res) => {
  console.log('To do 목록을 조회했습니다.');
  res.json(toDoList);
});

app.put('/api/todo/:id/todo', (req, res) => {
  console.log('Put route');
  console.log(req.params.id);
  console.log('데이터가 수정되었습니다.');
  const indexToPut = toDoList.findIndex(todo => todo.id == req.params.id);
  console.log(toDoList[indexToPut]);
  toDoList[indexToPut].todo = req.body.todo;
  res.json({ id: toDoList[indexToPut].id, todo: toDoList[indexToPut].todo });
  console.log(toDoList);
});

app.delete('/api/todo/:id', (req, res) => {
  const todoId = req.params.id;
  console.log('todoId: ', todoId);
  console.log(toDoList.findIndex(todo => todo.id == todoId));
  toDoList.splice(toDoList.findIndex(todo => todo.id == todoId), 1);
  console.log('데이터가 삭제되었습니다.');
  res.json({ 'success': 'true' });
  console.log(toDoList);
});

// GET /api/todo   <-- todo 항목 모두다 주시오
// POST /api/todo    <-- todo 에 신규 항목을 만들어 주시오
// DELETE /api/todo/:id    <--- todo를 해당 아이디만 지워주시오
// PUT /api/todo/:id    <-- todo를 해당 아디지만 수정해주시오
// PUT /api/todo/:id/completed     <-- 이게 더 낫다...

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
