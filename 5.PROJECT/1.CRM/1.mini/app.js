const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('mycrm.db');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));


// Routing

/****************************
 *   사용자 요청 페이지 전달
 ****************************/
app.get('/', (req, res) => {
  // console.log(__dirname);
  // console.log(__filename); // 파일명 앞에 경로(__dirname)까지 붙어 나온다.

  res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/users/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user-detail.html'));
});

/****************************
 *   Backend API 요청 처리
 ****************************/
app.get('/api/users', (req, res) => {
  const searchName = req.query.name || '';
  const pageNum = req.query.name || 1;
  const itemsPerPage = 20; // 고정 (하드코딩은 좋은 것은 아닌데, 수업이라서 일단 이렇게)
  let totalPages = 0;

  // 검색어가 있는지 없는지에 따라서 조건문으로 분기하면 코드가 중복되고 복잡
  // LIKE '%%' 으로 검색하면 전체 자료가 나오므로,
  // 검색어가 있든 없든 LIKE '%${searchName}%'로 검색

  // 총 검색 결과 갯수 구하기
  const queryCount = 'SELECT COUNT(id) AS count FROM users WHERE name LIKE ?';
  db.get(queryCount, `%${searchName}%`, (err, row) => {
    const searchCount = row.count;
    totalPages = Math.ceil(row.count / itemsPerPage);

    console.log('검색 갯수: ', searchCount);
    console.log('페이지 갯수: ', totalPages);

    // 여기서 왜 이것을 nested 형태로 구현해야 하는지 생각해보기 (비동기)
    const query = 'SELECT * FROM users WHERE name LIKE ? LIMIT ? ';
    db.all(query, [`%${searchName}%`, itemsPerPage], (err, rows) => {
      if (err) {
        console.error('사용자 조회 실패: ', err);
        return res.status(500).json({ error: '사용자 조회에 실패했습니다' });
      }
      // res.json(row, row.count);
      // 이 구조가 어떻게 생긴건지 잘 생각해보기
      res.json({ totalPages: totalPages, data: rows });
    })
  })
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT * FROM users WHERE Id=?';
  db.get(query, userId, (err, row) => {
    if (err) {
      console.error('사용자 조회 실패: ', err);
      return res.status(500).json({ error: '사용자 조회에 실패했습니다' });
    }

    if (!row) {
      console.error('사용자 조회 실패: ', err);
      return res.status(404).json({ error: '사용자가 존재하지 않습니다.' });
    }

    res.json(row);
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
