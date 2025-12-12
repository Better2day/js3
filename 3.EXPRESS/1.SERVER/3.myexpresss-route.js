const http = require('http');

const myapp = {
  routes: {}, // 이번에는 배열이 아니고, key-value 쌍을 탐색하기 좋은 자료구조인 객체

  // 라우트를 등록하는 함수
  register(route, handler) {
    this.routes[route] = handler;
  },

  // 요청 처리
  handleRequest(req, res) {
    const route = req.url; // 실제로 http module이 우리에게 전달해줄 내용
    const handler = this.routes[route];

    if (handler) { // 핸들러가 있으면 호출
      handler(req, res);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  },
};

function rootHandler(req, res) {
  console.log('사용자가 루트(/)에 방문');
  res.end('Welcome to my homeapge');
}
function userHandler(req, res) {
  console.log('사용자가 /users에 방문');
  res.write('사용자 정보를 처리중입니다...');
  res.end('안녕하세요, 사용자님');
}
function adminHandler(req, res) {
  console.log('사용자가 /admin 관리자 페이지에 방문');
  res.write('Admin 페이지는 인증이 필요합니다.');
  res.end('안녕히 가세요');
}

myapp.register('/', rootHandler);
myapp.register('/users', userHandler);
myapp.register('/admin', adminHandler);

const server = http.createServer((req, res) => {
  myapp.handleRequest(req, res);
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost');
});
