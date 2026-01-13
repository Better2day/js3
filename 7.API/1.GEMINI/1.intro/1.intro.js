// npm i dotenv
// .env 파일을 읽어서 환경 변수로 메모리에 올린다.
// const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config();

const key = process.env.GEMINI_API_KEY;

async function makeRequest(question) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  const body = {
    contents: [{
      parts: [{
        // text: "Explain how AI works in a few words"
        text: question
      }]
    }]
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  // console.log(data);

  const text = data.candidates[0].content.parts[0].text;
  console.log(text);
}

makeRequest('JavaScript를 배우기 위한 방법을 한 줄로 설명해줘');
makeRequest('오늘 저녁에 뭘 먹으면 좋을지 한 줄로 대답해줘');
