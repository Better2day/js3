// npm i @google/generative-ai (deprecated)
// npm i @google/genai
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ quiet: true }); // quiet: true 인자를 주면 경고문 같은 게 출력되지 않는다.

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const res = await ai.models.list();
  // console.log(res);
  const names = res.pageInternal.map(m => m.name);
  console.log(names);
};

run();
