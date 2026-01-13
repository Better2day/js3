// require 대신 import로 해보기
import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import morgan from 'morgan';

dotenv.config({ quite: false });

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

let history = [];

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// app.get('/', () => {
//   res.sendFile('');
// });

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('/api/chat 안. message: ', message);

  // 데모용 저장소. 사용자 구분 불가능 (세션 정보 없어서). 대화 무한 증식. 서버 재시작하면 초기화
  history.push({ role: 'user', parts: [{ text: message }] });
  history = history.slice(-20); // 최근 20개의 대화만 남겨놓는다.

  console.log('--- 질문 시작 ---');
  console.log(history);
  console.log('--- 질문 끝 ---');

  try {
    const response = await ai.models.generateContent({
      // model: 'gemini-3-flash-preview',
      model: 'gemini-2.0-flash-lite', // 무료 token 모자랄 것 같아서 모델 변경 (일일 최대 요청 수 (RPD))
      // contents: message
      contents: history
    });

    console.log(response);
    const reply = response.text;

    history.push({ role: 'bot', parts: [{ text: reply }] });

    res.json({ reply });
    // console.log(`response: ${response}`);
    // console.log(`response.text: ${response.text}`);
  } catch (e) {
    res.status(500).json({ error: '알 수 없는 오류' }); // 실제 서비스에서는 이런 것 말고 제대로 된 메시지를 써야 한다.
  }
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
