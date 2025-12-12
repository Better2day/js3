const http = require('http');

const myapp = {
  middlewares: [], // global middleware는 여기에 등록
  routes: {}, // route and routeHandlers 쌍은 여기에 등록

  // 전역 미들웨어를 등록하는 함수
  use(fn) {
    this.middlewares.push(fn);
  },

  // 라우트 핸들러를 등록하는 함수
  register(route, ...handlers) {
    this.routes[route] = handlers;
  },

  handleRequest(req, res) {
    // 요청 라우트 확인
    const route = req.url;
    const routeHandlers = this.routes[route];

    // 라우터가 없으면 (이제 배열을 받을 수 있으므로, 배열 길이가 0인 것도 오류 처리)
    if (!routeHandlers || routeHandlers.length === 0) {
      res.statusCode = 404;
      return res.end(`Not Found: ${route}`);
    }

    // 미들웨어가 있으면, 미들웨어부터 처리
    const context = { req, res, route };
    const stack = [...this.middlewares, ...routeHandlers]; // spread 연산자
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
    console.log('handleRequest 함수 종료');
  }
}

// 미들웨어 등록
function loggerMiddleware(context, next) {
  console.log(`[Log] ${context.req.method}, ${context.route}`);
  next();
  if (context.startTime) {
    const duration = Date.now() - context.startTime;
    console.log(`[Log2] ${context.req.method}, ${context.route} - ${context.res.statusCode} ${duration}ms`);
  }
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

function userMiddleware(context, next) {
  context.res.write('추가 /user 미들웨어 처리중...');
  next();
}
function adminAuthMiddleware(context, next) {
  context.res.write('추가 /admin 미들웨어 처리중...');
  const authorized = false;
  if (!authorized) {
    context.res.statusCode = 403 // forbidden
    context.res.end('Admin은 인증이 필요합니다.');
    return; // next()를 호출하지 않고, 종료 처리
  }

  next(); // authorized가 true면 다음 미들웨어/핸들러로 이동
}

// 인증 성공 (기대한 토큰)
// curl localhost:3000/admin -H "Authorization: Bearer admin1234"
// 인증 실패 (토큰이 틀렸음)
// curl localhost:3000/admin -H "Authorization: Bearer admin1233"
function adminRealAuthMiddleware(context, next) {
  const { req, res } = context;

  const authHeader = req.headers['authorization']; // 실제 인증 헤더 읽어오기
  if (!authHeader) {
    res.statusCode = 401; // Unauthorized (인증 실패)
    res.end('Authorization is required');
    return;
  }

  // 원하는 인증 형식: 'Bearer Token value'
  const [scheme, token] = authHeader.split(' '); // 띄어쓰기로 되어 있는 토큰을 분리한 후 구조 분해 할당
  if (scheme !== 'Bearer' || token !== 'admin1234') {
    res.statusCode = 403; // forbidden (인가 실패)
    res.end('Invalid or expired Token');
    return;
  }

  console.log('Admin 인증 성공');

  next(); // 인증이 성공하면
}

myapp.register('/', rootHandler);
myapp.register('/user', userMiddleware, userHandler);
// myapp.register('/admin', adminAuthMiddleware, adminHandler);
myapp.register('/admin', adminRealAuthMiddleware, adminHandler);

function printRouteStacks(app) {
  console.log('=== 내 라우트 실행 순서 알아보기 ===');

  for (const [route, handlers] of Object.entries(app.routes)) {
    const stack = [...app.middlewares, ...handlers];
    const names = ['req', ...stack.map(fn => fn.name), 'res'];

    console.log(`${route} ${names.join(' → ')}`);
  }
}

// printRouteStacks(myapp);

// 서버 생성
const server = http.createServer((req, res) => {
  myapp.handleRequest(req, res)
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost');
});
