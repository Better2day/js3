require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  // host: 'smtp.gmail.com',
  // port: 465,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD, // 2FA를 사용하고 Application password 있으면 그것
  }
});

const mailOptions = {
  from: process.env.GMAIL_EMAIL,
  // to: process.env.GMAIL_EMAIL, // 일단 나한테 시험 삼아 보내보고, 그 다음에 실제로 받을 사람의 계정으로 설정
  to: 'xcaws43y2@mozmail.com',
  subject: '메일 발송 테스트 (Node.js) - 4th',
  // text: 'sample';
  html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;">
  <tr>
    <td align="center" style="padding:40px 0;">
      
      <!-- 메일 컨테이너 -->
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial, Helvetica, sans-serif;">
        
        <!-- 헤더 -->
        <tr>
          <td style="background-color:#4f46e5; padding:20px; color:#ffffff; font-size:20px; font-weight:bold;">
            📬 Node.js 메일 테스트
          </td>
        </tr>

        <!-- 본문 -->
        <tr>
          <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
            <p style="margin:0 0 16px 0;">
              안녕하세요,
            </p>

            <p style="margin:0 0 16px 0;">
              Node.js로 작성한 <strong>HTML 메일 발송 테스트</strong>입니다.<br/>
              이제 단순 텍스트가 아닌, 레이아웃이 적용된 메일을 보낼 수 있습니다.
            </p>

            <p style="margin:0 0 24px 0;">
              이 메일은 외부 메일 API를 통해 발송되었습니다.
            </p>

            <!-- 버튼 -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="background-color:#4f46e5; border-radius:4px;">
                  <a href="https://example.com"
                      target="_blank"
                      style="display:inline-block; padding:12px 20px; color:#ffffff; text-decoration:none; font-size:14px;">
                    자세히 보기
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- 푸터 -->
        <tr>
          <td style="background-color:#f9fafb; padding:20px; font-size:12px; color:#777777; text-align:center;">
            본 메일은 테스트용으로 발송되었습니다.<br/>
            © 2026 Your Company
          </td>
        </tr>

      </table>
      <!-- //메일 컨테이너 -->

    </td>
  </tr>
</table>
`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('이메일 전송 성공:', info) // 
  }
});
