require('dotenv').config({ quiet: true });

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
const PORT = 3000;

const SECRET_KEY = process.env.TOSS_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('TOSS_SECRET_KEY 환경변수를 설정해주세요.');
}

const encodedApiSecretKey = 'Basic ' + Buffer.from(SECRET_KEY + ':').toString('base64');

app.use(express.static('public'));
app.use(express.json());

app.post('/confirm', async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;

  try {
    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm', // 요즘은 v2 API 사용
      {
        paymentKey, orderId, amount
      },
      {
        headers: {
          Authorization: encodedApiSecretKey,
          'Content-Type': 'application/json'
        }
      }
    );

    // 결제 성공
    res.status(200).json(response.data);
  } catch (error) {
    console.error('결제 승인 요청 실퍠:', error.emssage);
    res.status(400).json({ message: error.message });
  }

});

app.post('/cancel', async (req, res) => {
  // 아래 URL에 POST로 요청함면 결제 취소됨
  // 'https://api.tosspayments.com/v1/payments/' + encodeURIComponent(paymentKey) + '/cancel
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'product.html'));
})

app.get("/checkout", (req, res) => {
  res.sendFile(path.resolve("./public/checkout.html"));
});

app.get("/success", (req, res) => {
  const { paymentKey, orderId, amount } = req.query;

  // 깃허브 소스 코드도 완성 안 되어 있음
  /* 
  try {
    const response = await axios.post(

    )
  }
 */

  res.sendFile(path.resolve("./public/success.html"));
});

app.get("/fail", (req, res) => {
  res.sendFile(path.resolve("./public/fail.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 으로 샘플 앱이 실행되었습니다.`);
});
