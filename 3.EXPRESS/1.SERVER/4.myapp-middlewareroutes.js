const http = require('http');

const myapp = {
  middlewares: [], // global middleware는 여기에 등록
  routes: {}, // route and handler 쌍은 여기에 등록

  // 전역 미들웨어를 등록하는 함수
  use(fn) {
    this.middlewares.push(fn);
  },

  // 라우트 핸들러를 등록하는 함수
  register(route, handler) {
    this.routes[route] = handler;
  },

  handleRequest(req, res) {
    // 요청 라우트 확인
    const route = req.url;
    const handler = this.routes[route];

    // 라우터가 없으면
    if (!handler) {
      res.statusCode = 404;
      return res.end(`Not Found: ${route}`);
    }

    // 미들웨어가 있으면, 미들웨어부터 처리
    const context = { req, res, route };
    const stack = [...this.middlewares, handler]; // spread 연산자
    let index = 0;

    // 라우터 처리
    const next = () => {
      if (res.writableEnded) return; // 누군가 미들웨어에서 응답을 해버리면 거기서 종료

      const fn = stack[index++];
      if (fn) {
        fn(context, next);
      };
    }

    next(); // 첫 번째 미들웨어(핸들러)부터 실행을 시작
  }
}

// 미들웨어 등록
function loggerMiddleware(context, next) {
  console.log(`[Log] ${context.req.method}, ${context.route}`);
  next();
};
function timeMiddleware(context, next) {
  context.startTime = Date.now();
  next();
};
function headerMiddleware(context, next) {
  context.res.setHeader('Context-Type', 'text/plain: charset=utf-8');
  next();
}

myapp.use(loggerMiddleware);
myapp.use(timeMiddleware);
myapp.use(headerMiddleware);

// 라우터 등록
function rootHandler(context) {
  context.res.end('Hello from /');
}
function userHandler(context) {
  context.res.end('Hello from /user');
}
function adminHandler(context) {
  context.res.end('Hello from /admin');
}

myapp.register('/', rootHandler);
myapp.register('/user', userHandler);
myapp.register('/admin', adminHandler);


// 서버 생성
const server = http.createServer((req, res) => {
  myapp.handleRequest(req, res)
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost');
});
