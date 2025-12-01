const Shape = require('./Shape');

class Star extends Shape {
  constructor(length) {
    super('Star');
    this.length = length;
  }

  getStarArea() {
    return this.length * 5 ** 2; // 멋대로 쓴 가짜 공식
  }

  getArea() {
    return
  }
}

module.exports = Star;
