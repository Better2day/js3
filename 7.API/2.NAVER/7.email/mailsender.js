require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com',
  port: 465,
  auth: {
    user: process.env.NAVER_EMAIL,
    pass: process.env.NAVER_PASSWORD, // 2FA를 사용하고 Application password 있으면 그것
  }
});

const mailOptions = {
  from: process.env.NAVER_EMAIL,
  // to: process.env.NAVER_EMAIL, // 일단 나한테 시험 삼아 보내보고, 그 다음에 실제로 받을 사람의 계정으로 설정
  to: '7hloe1qf3@mozmail.com',
  subject: '메일 발송 테스트 (Node.js)',
  text: '안녕하세요, Node.js로 작성한 두 번째 메일을 발송합니다.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('이메일 전송 성공:', info) // 
  }
});
