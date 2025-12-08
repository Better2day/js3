const express = require('express');
const app = express();
const PORT = 3000;

// static folder (image/css/js 같은 정적 파일이 있으니, 필요한 것은 알아서 가져가게 함)
// html 파일은?

app.use(express.static('public'));

// 충돌하는 라우트가 있으면, 소스코드에서 위에 있는 것이 먼저 실행
app.get('/', (req, res) => {
  res.send(`그럼 나는?`);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
