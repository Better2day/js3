const myapp = {
  middlewares: [],

  // Middleware를 등록하는 메서드
  register(fn) {
    this.middlewares.push(fn);
  },

  // Middleware를 실행하는 메서드
  run(context) {
    for (let fn of this.middlewares) { // 등록된 미들웨어를 순차 실행
      fn(context);
    }
  }
}

function middleware1(context) {
  console.log('Middleware 1 실행');
  context.step1 = 'Middleware 1이 처리한 변수';
}

function middleware2(context) {
  console.log('Middleware 2 실행');
  context.step2 = 'Middleware 2가 처리한 변수';
}

function middleware3(context) {
  console.log('Middleware 3 실행');
  context.step3 = 'Middleware 3이 처리한 변수';
}

myapp.register(middleware1);
myapp.register(middleware2);
myapp.register(middleware3);

const context = {};

myapp.run(context);

console.log('최종 context 상태: ', context);
