const Shape = require('./Shape');

class Triangle extends Shape {
  constructor(base, height) {
    super('Triangle');
    this.base = base;
    this.height = height;
  }
  getArea() {
    return this.base * this.height * 0.5; // 매우 큰 숫자는 overflow 발생 가능성이 있다.
    // 각종 라이브러리에서 숫자를 먼저 곱하는 이유가 여기에 있다.
    // 반으로 나누는 연산을 먼저 함으로써 overflow 발생 가능성을 줄이는 고급 기술이다.
  }
}

module.exports = Triangle;
