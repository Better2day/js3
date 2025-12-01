// Shape 이라는 generic class를 정의. 넓이를 구하는 함수
class Shape {
  getArea() {
    return 0;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    // 상속받은 클래스에서 this를 사용하려면, 부모 클래스 super()를 먼저 호출해야만 한다.
    super(); // 내 부모의 메모리 공간을 초기화. 부모는 생성자가 없으니, 빈 공간으로 초기화
    this.base = base;
    this.height = height;
  }

  getArea() {
    return this.base * this.height / 2;
  }

}

class Square extends Shape {
  constructor(sideLength) {
    super(); // this는 나, super는 부모
    this.length = sideLength; // 
  }
  getArea() {
    return this.length * this.length;
  }
}

const mySquare = new Square(5);
console.log('정사각형의 넓이는: ', mySquare.getArea());

const myTriangle = new Triangle(5, 2);
console.log('삼각형의 넓이는: ', myTriangle.getArea());
