const dotenv = require('dotenv');

dotenv.config({ quiet: true });

const text = '자바스크립트';
const encText = encodeURIComponent(text);

const url = `https://openapi.naver.com/v1/search/blog?query=${encText}`; // 기본값 json
// const url = 'https://openapi.naver.com/v1/search/blog.json'
// const url = 'https://openapi.naver.com/v1/search/blog.xml' // xml

const headers = {
  'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
  'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
};

async function fetchData() {
  fetch(url, {
    // method: 'GET', // 기본값이라서 안 써도 동일
    headers
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Request failed')
      }
      return res.json();
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

fetchData();
