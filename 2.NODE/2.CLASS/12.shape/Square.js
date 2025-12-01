const Shape = require('./Shape');

class Square extends Shape {
  constructor(length) {
    super('Square');
    this.length = length;
  }

  getArea(length) {
    // return this.length * this.length;
    return this.length ** 2; // 2승. ※ 다른 언어에서는 length ^ 2 식으로 많이 사용하는데, JS에서는 ^가 XOR 연산이므로 주의
  }
}

module.exports = Square;
