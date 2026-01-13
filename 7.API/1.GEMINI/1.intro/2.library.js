// npm i @google/generative-ai (deprecated)
// npm i @google/genai
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ quiet: true }); // quiet: true 인자를 주면 경고문 같은 게 출력되지 않는다.

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function ask_question(question) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    // model: 'gemini-3-flash-preview',
    contents: question
  })

  console.log(response.text);
}

// ask_question('인공지능이 무엇인지 3문장으로 답변하는데, 각 문장은 - (bullet)으로 구분해 줘.');
ask_question('Google AI Studio에서 무료 등급 회원이 만든 API 키로 너에게 하루에 몇 번 질의할 수 있어? 아니면 일별 외에도 제한사항이 있어?');
