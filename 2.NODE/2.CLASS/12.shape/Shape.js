class Shape {
  constructor(name) {
    this.name = name;
  }

  static test = 'test';

  getArea() { // 이것을 abstract class처럼, abstract method처럼 강제로 구현하도록 하는 기법
    throw Error('나를 좀 구현해주세요'); // 오버라이딩하지 않으면 오류 발생

  }
}

module.exports = Shape;
