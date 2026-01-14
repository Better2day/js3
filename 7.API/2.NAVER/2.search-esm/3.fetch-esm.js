// const dotenv = require('dotenv');
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const PAGE_SIZE = 10;
const OFFSET = 1;

const text = '자바스크립트';
const encText = encodeURIComponent(text);

const articles = [];

// const url = `https://openapi.naver.com/v1/search/blog?query=${encText}`; // 기본값 json
// const url = `https://openapi.naver.com/v1/search/blog?query=${encText}&start=${OFFSET}&display=${PAGE_SIZE}`; // 기본값 json
// console.log(url);
// const url = 'https://openapi.naver.com/v1/search/blog.json'
// const url = 'https://openapi.naver.com/v1/search/blog.xml' // xml

const headers = {
  'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
  'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
};

// 1. 원하는 페이지 읽어오기 (아래처럼 인자를 받아서 처리)
// async function fetchData({text, page = 1, display = 10}) {

// 2. 원하는 페이지 뭉치 읽어오기 (한 번에 최대 100개만 요청할 수 있으므로, 그 이상 불러올 경우)
// async function fetchMultiData({text, page = 3, display = 100}) {

async function fetchData() {
  for (let i = 0; i < 3; i++) {
    const url = `https://openapi.naver.com/v1/search/blog?query=${encText}&start=${OFFSET + (i * 10)}&display=${PAGE_SIZE}`; // 기본값 json
    console.log(url);

    // try {
    await fetch(url, {
      // method: 'GET', // 기본값이라서 안 써도 동일
      headers
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Request failed. ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // console.log(data);
        // articles.push(data.items); // 이렇게 하고 나서 평탄화해도 되고
        articles.push(...data.items); // Spread 문법을 사용해서 평탄화 작업이 필요없게 같은 깊이로 추가해도 된다.
      })
      .catch(err => console.error('Error:', err.message))
  }

  console.log(articles.length);
  console.log(articles);

  // flat은 원본 배열을 변경하지 않고, 평탄화한 복사본을 반환한다.
  const flattenedArticles = articles.flat();

  console.log(flattenedArticles.length);
  console.log(flattenedArticles);

  // fetch then catch 식으로 처리했으면 try 'catch' 블럭으로 감싸지 않아도 된다. 둘 중 하나만
  // .catch(err => console.log(err))
  // } catch (err) {
  //   console.error('Error:', err.message);
  // }
};

fetchData();
