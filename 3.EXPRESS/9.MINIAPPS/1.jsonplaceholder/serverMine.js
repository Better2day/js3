const express = require('express');
const app = express();
const PORT = 3000;

const posts = [
  { id: 1, title: '나의 첫 번째 글', body: '이것은 나의 첫 번째 글입니다.' },
  { id: 2, title: '나의 두 번째 글', body: '이것은 나의 두 번째 글입니다.' },
  { id: 3, title: '나의 세 번째 글', body: '이것은 나의 세 번째 글입니다.' }
];

// Middleware
app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// Route
app.post('/api/post/', (req, res) => {
  const postId = posts.length;
  console.log(req.body);
  const { title, body } = req.body;
  posts.push({ id: postId, title, body });
  res.send(posts[postId]);
});

app.get('/api/post', (req, res) => {
  // res.send({ })
  res.json(posts); // 알아서 나의 헤더에 application/json을 담아서 전송
});
app.get('/api/post/:id', (req, res) => {
  const postId = req.params.id;
  // console.log(postId);
  res.json(posts[postId - 1]);
});

// 쿼리 방식 실험. 그러나 현 상황에서는 parameter 방식이 더 적합한 듯
// app.put('/api/post', (req, res) => {
//   const postId = req.query.id;
app.put('/api/post/:id', (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;
  console.log('postId: ', postId);
  const postIdx = posts.findIndex(post => post.id == postId);
  posts[postIdx] = {
    id: postId,
    title,
    body,
  };
  res.json(posts[postIdx]);
});

app.delete('/api/post/:id', (req, res) => {
  const postId = req.params.id;
  console.log('posts:', posts);
  console.log('postId:', postId);
  const postIdx = posts.findIndex(post => post.id == postId);
  console.log('postIdx:', postIdx);
  posts.splice(postIdx, 1);
  console.log('posts:', posts);
  res.send('삭제가 완료됐습니다');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
