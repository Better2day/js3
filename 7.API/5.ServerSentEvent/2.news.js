const path = require('path');
const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '2.news.html'));
});

const newsArticles = [
  '정부, 2026년 경제 성장률 전망 2.3%로 상향 조정',
  '서울 아파트 매매가 5주 연속 상승세 기록',
  'AI 도입 확산에 중소기업 생산성 크게 향상',
  '한파 특보 전국 확대…주말까지 영하권 추위',
  '국내 증시, 외국인 매수세에 코스피 상승 마감',
  '교육부, 고교학점제 전면 시행 방안 발표',
  '환경부, 미세먼지 저감 위한 추가 대책 검토',
  'K-콘텐츠 수출액 역대 최대치 경신',
  '청년층 취업자 수 증가…고용 시장 회복 신호',
  '보건당국, 독감 유행 주의보 발령'
];

app.get('/newsfeed', (req, res) => {
  // SSE Header 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 뉴스 전송
  let index = 0;
  const sendNews = () => {
    if (index >= newsArticles.length) {
      index = 0;
    }

    const news = newsArticles[index];
    console.log(news);
    res.write(`data: ${JSON.stringify({ news })}\n\n`);
    index++;
  };

  // 2~5초 사이 무작위 시간으로 지연해서 자연스럽게 보이도록 함 - 1회성 랜덤 (매번 무작위로 보내려면 setTimeout을 사용해야 할 듯)
  const interval = setInterval(() => {
    sendNews();
  }, Math.floor(Math.random() * 2000) + 2000);

  // 연결이 종료되면? (클라이언트가 브라우저 창이나 탭을 닫으면) (∵ 그대로 놔두면 계속 setInterval이 돌아가서 메모리 누수)
  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
