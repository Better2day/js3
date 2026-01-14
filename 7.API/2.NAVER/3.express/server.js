// const dotenv = require('dotenv');
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT || 3000;
const PAGE_SIZE = 10;

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

if (!client_id || !client_secret) {
  console.error('NAVER_CLIENT_ID or NAVER_CLIENT_SECRET is not set !')
  process.exit(1);
}

// const articles = [];

// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));
// app.use(cors()); // cors({ origin: '*' }); // 전체 허용 (보안 0). 사용하는 의미가 없다.
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173']
})); // 내 local React Server에서 오는 요청만 허용


async function searchNaverBlog({ query = '기본값', page = 1, display = PAGE_SIZE }) {
  const queryStr = encodeURIComponent(query);
  const start = (page - 1) * display + 1;
  const url = `https://openapi.naver.com/v1/search/blog?query=${queryStr}&start=${start}&display=${display}`; // 기본값 json
  // console.log(url);

  try {
    const res = await fetch(url, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret
      }
    });

    if (!res.ok) {
      throw new Error(`Request failed. ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);
    return data;

    // articles.push(data.items)
  } catch (err) {
    console.error('Fetch Error:', err.message);
  }
}

app.get('/', (req, res) => {
  // console.log(import.meta.url)
  // console.log(import.meta.filename);
  // console.log(import.meta.dirname);
  // console.log(path.join(import.meta.dirname, 'public', 'search.html'));
  // res.json({ 'status': 'testing now' });
  res.sendFile(path.join(import.meta.dirname, 'public', 'search.html'));

});

app.get('/api/search', async (req, res) => {
  const query = req.query.query;
  const page = parseInt(req.query.page || '1', 10);
  const display = parseInt(req.query.display || '10', 10);

  console.log('/api/search 에서 { query, page, display }: ');
  console.log({ query, page, display });

  try {
    const searchResult = await searchNaverBlog({ query, page, display });
    res.json(searchResult);
  } catch (err) {
    console.log(err);
    res.status(500).send({ 'Error:': err });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`포트 ${PORT} 이미 사용중`);
  } else {
    console.log('서버 에러', err);
    process.exit(1);
  }
});
